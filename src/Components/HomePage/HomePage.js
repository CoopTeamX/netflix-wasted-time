import React from "react";
import * as Papa from "papaparse";
import Processor from "../../Processor/Processor";
import "./HomePage.scss";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined
    };
    this.data = {};
    this.updateData = this.updateData.bind(this);
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });
  };

  updateData(result) {
    this.setState({ data: result.data });
    Processor.process(result.data);
  }

  render() {

    /*<input
      className="csv-input"
      type="file"
      ref={input => {
        this.filesInput = input;
      }}
      name="file"
      placeholder={null}
      onChange={this.handleChange}
    />*/

    // todo manage drag and drop file

    return (
      <div>
        <div className="main-center">
          <p className="main-title">Welcome!</p>
          <p className="main-fact">Netflix was originally called Kibble</p>

          <div className="main-upload">
            <div className="main-title">Upload</div><br/>
            <div className="sub-title">Drop your file here</div>
          </div>
          <div>Find out how to download your history</div>
        </div>

        <div className="advices">
          <div className="advice" style={{borderLeft: 'solid 8px #7B87DD'}}>Find out how many <br/>hours you've <br/>wasted on Netflix</div>
          <div className="advice" style={{borderLeft: 'solid 8px #FF786B'}}>You'll see, it's not<br/> that bad...</div>
          <div className="advice" style={{borderLeft: 'solid 8px #FBAF6A'}}>You feel even <br/>better after</div>
        </div>
      </div>
    );
  }
}

export default HomePage;
