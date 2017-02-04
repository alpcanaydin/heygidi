import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Years from './Years';

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <Header />
        {children}
        <Years />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
