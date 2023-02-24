import React from 'react'
import style from './Footer.module.css'

const Footer = () => {
  return (
    <div className={style.footer}>

      <div className={style.container}>

        <div className={style.col}>
          <h2 className={style.title}>Learn</h2>
          <a href="https://concordium.com/articles-and-blogs/">Blog</a>
          <a href="https://concordium.com/">Concordium</a>
          <a href="https://developer.concordium.software/en/mainnet/index.html">Documentation</a>
        </div>

        <div className={style.col}>
          <h2 className={style.title}>Developers</h2>
          <a href="https://github.com/Concordium/concordium-rust-sdk">Concordium Rust SDK</a>
          <a href="https://github.com/Concordium/concordium-node-sdk-js">Concordium Javascript (Node / Web) SDK</a>
        </div>

        <div className={style.col}>
          <h2 className={style.title}>Validators</h2>
          <a href="https://developer.concordium.software/en/mainnet/net/nodes/node-requirements.html">Run node</a>
          <a href="https://status.mainnet.concordium.software/">Status page</a>
          <a href="https://support.concordium.software/c/releases/9">release information</a>
        </div>

        <div className={style.col}>
          <h2 className={style.title}>Useful links</h2>
          <a href="https://concordium.com/developer-ecosystem/">Developer ecosystem</a>
        </div>

      </div>

    </div>
  )
}

export default Footer
