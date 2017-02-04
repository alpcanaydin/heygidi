import React, { Component, PropTypes } from 'react';

import Loading from './Loading';
import Cloud from './Cloud';

import dataTransformer from '../util/dataTransformer';

class Year extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
  }

  componentWillMount() {
    this.loadData(this.props.params.year);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.year !== this.props.params.year) {
      this.setState({ loading: true }, () => {
        this.loadData(nextProps.params.year);
      });
    }
  }

  loadData(year) {
    /* eslint-disable */
    const data = require(`../data/${year}.json`);
    /* eslint-enable */

    this.setState({
      loading: false,
      data: dataTransformer(data)
    });
  }

  render() {
    const { data, loading } = this.state;

    const width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth
    ;

    const height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight
    ;

    if (loading) {
      return <Loading />;
    }

    return (
      <Cloud
        width={width - 30}
        height={height - 150}
        fontFamily="Roboto"
        data={data}
      />
    );
  }
}

Year.propTypes = {
  params: PropTypes.object.isRequired
};

export default Year;
