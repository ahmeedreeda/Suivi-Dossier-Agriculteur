import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './SelectRegVille.module.css'

function SelectRegVille({ formData, handleChange, className }) {
  const [regions, setRegions] = useState([])
  const [villes, setVilles] = useState([])
  const [loadingRegions, setLoadingRegions] = useState(true)
  const [loadingVilles, setLoadingVilles] = useState(true)

  useEffect(() => {
    axios.get("http://localhost/App/back-end/getRegion.php")
      .then(res => {
        setRegions(res.data)
        setLoadingRegions(false)
      })
      .catch(err => {
        console.error(err)
        setLoadingRegions(false)
      })
  }, [])

  useEffect(() => {
    axios.get("http://localhost/App/back-end/getVille.php")
      .then(res => {
        setVilles(res.data)
        setLoadingVilles(false)
      })
      .catch(err => {
        console.error(err)
        setLoadingVilles(false)
      })
  }, [])

  const villesFiltered = (Array.isArray(villes))
    ? villes.filter(v => Number(v.region) === Number(formData.region))
    : []

  return (
    <div className={styles.selectRow}>
      <div className={styles.selectWrapper}>
        <select 
          name="region" 
          value={formData.region} 
          onChange={handleChange} 
          className={`${styles.select} ${className || ''}`}
          disabled={loadingRegions}
        >
          <option value="">
            {loadingRegions ? "Chargement des régions..." : "Choisir votre région"}
          </option>
          {(Array.isArray(regions)) && regions.map(r => (
            <option key={r.id} value={r.id}>{r.region}</option>
          ))}
        </select>
        {formData.region && (
          <span className={styles.selectedIcon}>✓</span>
        )}
      </div>

      <div className={styles.selectWrapper}>
        <select 
          name="ville" 
          value={formData.ville} 
          onChange={handleChange} 
          className={`${styles.select} ${className || ''}`}
          disabled={!formData.region || loadingVilles}
        >
          <option value="">
            {!formData.region 
              ? "Sélectionnez d'abord une région" 
              : loadingVilles 
                ? "Chargement des villes..." 
                : "Choisir votre ville"
            }
          </option>
          {villesFiltered.map(v => (
            <option key={v.id} value={v.id}>{v.ville}</option>
          ))}
        </select>
        {formData.ville && (
          <span className={styles.selectedIcon}>✓</span>
        )}
      </div>
    </div>
  )
}

export default SelectRegVille