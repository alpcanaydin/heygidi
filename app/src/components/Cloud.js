import React, { Component, PropTypes } from 'react';
import { scaleOrdinal, schemeCategory20 } from 'd3-scale';
import { select } from 'd3-selection';
import d3Cloud from 'd3-cloud';

import './Cloud.css';

class Cloud extends Component {
  componentWillMount() {
    const { width, height, fontFamily, data } = this.props;

    const fill = scaleOrdinal().range(schemeCategory20);

    const draw = () => select('.cloud')
      .append('svg')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
      .selectAll('text')
        .data(data)
      .enter()
      .append('text')
        .style('font-size', d => `${d.size}px`)
        .style('font-family', fontFamily)
        .style('fill', (d, i) => fill(i))
        .attr('text-anchor', 'middle')
        .attr('transform', d =>
          `translate(${[d.x, d.y]})rotate(${d.rotate})`
        )
        .text(d => d.text)
    ;

    this.layout = d3Cloud()
      .size([width, height])
      .words(data)
      .padding(5)
      .rotate(0)
      .font(fontFamily)
      .fontSize(d => d.size)
      .on('end', draw)
    ;
  }

  componentDidMount() {
    this.layout.start();
  }

  render() {
    return (
      <div
        ref={(ref) => { this.cloudElement = ref; }}
        className="cloud"
      />
    );
  }
}

Cloud.defaultProps = {
  fontFamily: 'Impact'
};

Cloud.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fontFamily: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  })).isRequired
};

export default Cloud;
