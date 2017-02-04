import React, { Component } from 'react';
import { Link } from 'react-router';

import './Years.css';

class Years extends Component {
  render() {
    const years = [
      2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
      2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002,
      2001, 2000, 1999, 1998, 1997
    ];

    return (
      <div className="years">
        {years.map(year =>
          <Link
            key={year}
            to={`/year/${year}`}
            className="year"
            activeClassName="active"
          >
            {year}
          </Link>
        )}
      </div>
    );
  }
}

export default Years;
