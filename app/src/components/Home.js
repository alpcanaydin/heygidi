import React, { Component } from 'react';
import Cloud from './Cloud';
import dataTransformer from '../util/dataTransformer';

import data from '../data/all.json';

class Home extends Component {
  render() {
    const width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth
    ;

    const height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight
    ;

    return (
      <Cloud
        width={width - 30}
        height={height - 150}
        fontFamily="Roboto"
        data={dataTransformer(data)}
      />
    );
  }
}

export default Home;
