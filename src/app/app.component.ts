import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedCSVFileName: any;
  isCSV_Valid: boolean;
  constructor(private papa: Papa) {

      // TEST IF YOUR PARSER IS WORKING FINE
      const csvData = '"Hello","World!"';

      this.papa.parse(csvData,{
          complete: (result) => {
              console.log('Parsed: ', result);
          }
      });
  }

  // LOAD CSV FILE FROM INPUT
    fileChangeListener($event: any): void {

    const files = $event.srcElement.files;

    if (files !== null && files !== undefined && files.length > 0) {
      this.selectedCSVFileName = files[0].name;

      const reader: FileReader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = e => {

        const csv = reader.result;
        const results = this.papa.parse(csv as string, { header: false });

        // VALIDATE PARSED CSV FILE
        if (results !== null && results !== undefined && results.data !== null &&
          results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
          this.isCSV_Valid = true;

          // PERFORM OPERATIONS ON PARSED CSV
          let csvTableHeader = results.data[0];

          let csvTableData = [...results.data.slice(1, results.data.length)];
          console.log(csvTableData)

        } else {
          for (let i = 0; i < results.errors.length; i++) {
            console.log( 'Error Parsing CSV File: ',results.errors[i].message);
          }
        }
      };
    } else {
      console.log('No File Selected');
    }
  }
}
