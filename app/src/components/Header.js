import React, { Component } from 'react';
import { Link } from 'react-router';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/" className="logo">
          HEYGİDİ
        </Link>

        <div className="links">
          <a
            href="#"
            data-balloon="Heygidi, Hurriyet API kullanılarak
              1997'den 2017'ye kadar Gündem kategorisindeki haberlerin
              başlıklarında en çok kullanılan kelimeleri görselleştiren
              bir istatistik çalışmasıdır.
            "
            data-balloon-pos="down"
            data-balloon-length="large"
          >
            nedir?
          </a>
          <a
            href="https://github.com/alpcanaydin/heygidi"
            target="_blank"
            rel="noopener noreferrer"
          >kaynağı görüntüle</a>
          <a
            href="https://twitter.com/alpcanaydin"
            target="_blank"
            rel="noopener noreferrer"
          >@alpcanaydin</a>
        </div>
      </div>
    );
  }
}

export default Header;
