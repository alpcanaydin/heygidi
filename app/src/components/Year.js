import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';

import Loading from './Loading';
import Cloud from './Cloud';

import dataTransformer from '../util/dataTransformer';

import './Year.css';

class Year extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      years: [
        2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
        2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002,
        2001, 2000, 1999, 1998, 1997
      ]
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
    if (this.state.years.indexOf(parseInt(year, 10)) === -1) {
      hashHistory.push('/');
      return;
    }

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

    if (!data.length) {
      return (
        <div className="noData">
          Bu yıl için veri bulunmuyor.
        </div>
      );
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
