import React, { useState } from 'react'
import styles from './login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SignUpError from '../Alerts/SignUpError';
import SingUpSuccess from '../Alerts/SingUpSuccess';

function LogIn() {
  const navigate = useNavigate();
  const [message,setMessage] = useState('')
  const [form, setForm] = useState({
    cin: "",
    password: ""
  });
  const [success,setSuccess] = useState()
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
      const res = await axios.post('http://localhost/App/back-end/logIn.php',form);
      if(res.data.success){
        setMessage(res.data.message)
        setSuccess(res.data.success)
        if(res.data.user.role === "user"){
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate(`/${res.data.user.cin}/profile`)
        }else{
          localStorage.setItem("admin", JSON.stringify(res.data.user));
          navigate('/admin/profileAdmin')
        }
      }
      else{
        setMessage(res.data.message)
        setSuccess(res.data.success)
      }
  }

  return (
    <div className={styles.container}>
      {/* Éléments décoratifs */}
      <div className={styles.bgCircle1}></div>
      <div className={styles.bgCircle2}></div>

      <div className={styles.card}>
        {/* Logo Section */}
        <div className={styles.left}>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo-clients-avs-440x21013.png`}
            alt="logo"
            className={styles.logo}
          />
        </div>

        {/* Form Section */}
        <div className={styles.right}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {success === false && message && (
              <div className={styles.errorAlert}>
                {message}
              </div>
            )}

            <h2 className={styles.title}>Log In</h2>

            <input
              type="text"
              placeholder="Cin"
              value={form.cin}
              onChange={handleChange}
              name='cin'
              className={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              name='password'
              className={styles.input}
            />

            <button type="submit" className={styles.button}>Log In</button>
            <div className={styles.registerLink}>
                <Link to="/register">Creer un Compte</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default LogIn