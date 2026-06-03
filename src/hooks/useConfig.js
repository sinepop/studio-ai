import { useState, useEffect, useCallback } from 'react'

export default function useConfig() {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    window.electronAPI?.getConfig().then(c => { if (c) setConfig(c) })
  }, [])

  const save = useCallback(async (newCfg) => {
    setConfig(newCfg)
    await window.electronAPI?.saveConfig(newCfg)
  }, [])

  const updateProvider = useCallback((track, patch) => {
    if (!config) return
    const next = {
      ...config,
      providers: { ...config.providers, [track]: { ...config.providers[track], ...patch } }
    }
    save(next)
  }, [config, save])

  const updateGeneral = useCallback((patch) => {
    if (!config) return
    const next = { ...config, general: { ...config.general, ...patch } }
    save(next)
  }, [config, save])

  return { config, save, updateProvider, updateGeneral }
}
