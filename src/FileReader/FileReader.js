import React from 'react';
import * as Papa from 'papaparse';

class FileReader extends React.Component {
    constructor() {
        super();
        this.state = {
            csvfile: undefined
        };
        this.data = {}
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
        this.setState({data: result.data});
        console.log(result.data);
    }

    render() {
        console.log(this.state.csvfile);

        var uploadedFile = this.state.data ? <h2>File uploaded! </h2> : <h2>Waiting for your file</h2>

        return (
            <div className="App">
                {uploadedFile}
                <input
                    className="csv-input"
                    type="file"
                    ref={input => {
                        this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                />
                <p />
                <button onClick={this.importCSV}> Upload now!</button>
            </div>
        );
    }
}

export default FileReader;
