import Dropzone from 'react-dropzone';
import React from "react";
import * as Papa from "papaparse";
import "./HomePage.scss";

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {data: {}};
  }

  readFiles(acceptedFiles) {
    acceptedFiles.forEach((file) => {
      Papa.parse(file, {
        complete: function(results) {
          this.props.updateData(results.data);
        }.bind(this)
      });
    })
  };

  render() {
    return (
      <div>
        <div className="main-center">
          <p className="main-title">Welcome!</p>
          <p className="main-fact">Netflix was originally called Kibble</p>

          <div className="main-upload">
            <Dropzone onDrop={acceptedFiles => this.readFiles(acceptedFiles)}>
              {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="main-title">Upload</div><br/>
                      <div className="sub-title">Drop your file or click here</div>
                    </div>
                  </section>
              )}
            </Dropzone>
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
