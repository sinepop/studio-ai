import { useState, useCallback } from 'react'

export default function useChat(config, canvas) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const send = useCallback(async (text) => {
    if (!text.trim() || loading) return
    const userMsg = { role: 'user', content: text, id: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    const provider = config?.providers?.chat
    if (!provider?.apiKey) {
      setMessages(prev => [...prev, { role: 'assistant', content: '请先在设置中配置对话 API Key。', id: Date.now() + 1 }])
      setLoading(false)
      return
    }

    try {
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
      const system = `你是 StudioAI，专业 AI 创意设计工作流 Agent。

## 当前画布
${canvas ? canvas.allAssets?.slice(0, 10).map(a => `  [${a.id}] "${a.label}" | ${a.type} | ${a.prompt?.slice(0, 80)}`).join('\n') || '（空）' : '（空）'}

## 响应格式（只输出纯JSON，不要markdown代码块）
{"understanding":"一句话理解用户意图","intent":"chat|generate_image|modify_image|generate_video|image_to_video","tasks":[{"id":"t1","type":"image|video","label":"中文短标签","prompt":"高质量英文prompt，80词以上，含主体/场景/镜头/构图/光线/色彩/材质/情绪/细节","negative_prompt":"low quality, blurry, deformed, watermark, text","source_image_id":null,"duration":5,"ratio":"1:1"}],"reply":"中文友好回复"}

## 规则
1. 仅聊天/解释时：intent=chat，tasks=[]。
2. 生图/画/设计图时：intent=generate_image，tasks.type=image。
3. 生视频/动画时：intent=generate_video，tasks.type=video。
4. 选中资产说修改：intent=modify_image，source_image_id填资产ID。
5. 选中图片说动起来：intent=image_to_video，tasks.type=video。
6. prompt必须英文，80词以上，具体描述镜头/光线/材质/色彩。
7. reply必须中文，不要声称已经生成完成，只说明你的创作计划。`

      const result = await window.electronAPI.chat({ history, system }, provider)

      // Try to parse JSON response for intent routing
      let replyText = result.text
      let parsed = null
      try {
        // Extract JSON from possible markdown code blocks
        const jsonMatch = result.text.match(/\{[\s\S]*\}/)
        if (jsonMatch) parsed = JSON.parse(jsonMatch[0])
      } catch {}

      if (parsed?.tasks?.length > 0 && canvas) {
        // Process image/video tasks
        for (const task of parsed.tasks) {
          if (task.type === 'image') {
            const imgProvider = config?.providers?.image
            if (imgProvider?.apiKey) {
              try {
                const url = await window.electronAPI.generateImage({
                  prompt: task.prompt, ratio: task.ratio || '1:1',
                  ...imgProvider
                })
                canvas.addAsset({ type: 'image', url, prompt: task.prompt, label: task.label, model: imgProvider.model, ratio: task.ratio })
              } catch (e) {
                console.error('Image generation failed:', e)
              }
            }
          }
          if (task.type === 'video') {
            const vidProvider = config?.providers?.video
            if (vidProvider?.apiKey) {
              try {
                const videoResult = await window.electronAPI.generateVideo({
                  prompt: task.prompt, ratio: task.ratio || '1:1', duration: task.duration || 5,
                  ...vidProvider
                })
                // Add to task queue if available
                if (videoResult?.taskId) {
                  // TaskQueue will be handled by parent
                }
              } catch (e) {
                console.error('Video generation failed:', e)
              }
            }
          }
        }
        replyText = parsed.reply || result.text
      } else if (parsed?.reply) {
        replyText = parsed.reply
      }

      const replyMsg = { role: 'assistant', content: replyText, id: Date.now() + 1, model: result.model }
      setMessages(prev => [...prev, replyMsg])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `错误：${err.message}`, id: Date.now() + 1, error: true }])
    } finally {
      setLoading(false)
    }
  }, [config, messages, loading, canvas])

  const clear = useCallback(() => setMessages([]), [])
  return { messages, loading, send, clear }
}
