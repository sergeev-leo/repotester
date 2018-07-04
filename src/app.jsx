import React from 'react';
import DatePicker from './DatePickerContainer';
import LoadButton from './LoadButtonContainer';
import List from './ListContainer';

const App = () => (
  <div>
    <section className="left-sidebar">
      <DatePicker />
      <LoadButton />
    </section>
    <List />
  </div>
);

export default App;
