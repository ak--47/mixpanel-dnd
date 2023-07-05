/**
 * GOAL:
 * parse literally anything into a object
 * return a 10 record sample of the data
 */

import Papa from 'papaparse';
import { isJSONStr } from "ak-tools";

//todo: we know the format of the data, so we can use that to improve the parsing
export function parser(dataAsString, format) {
	let data = [];
	//check if it's already JSON
	if (isJSONStr(dataAsString)) {
		try {
			data = JSON.parse(dataAsString);
			return data;
		}
		catch (e) {
			//not JSON :(
		}

	}

	//check if it's NDJSON
	if (dataAsString.startsWith('{') && dataAsString.trim().endsWith('}')) {
		try {
			data = dataAsString.split('\n').filter(a => a).map(JSON.parse);
			return data;
		}
		catch (e) {
			//not NDJSON :(
		}
	}

	//check if it's CSV/TSV
	try {
		const parsed = Papa.parse(dataAsString, { header: true });
		data = parsed.data;
		return data;
	}
	catch (e) {
		//not CSV/TSV :(
	}

	return data;


}

// export function readFile(file) {
// 	return new Promise((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.onload = () => {
// 			resolve(reader.result);
// 		};
// 		reader.onerror = reject;
// 		reader.readAsText(file);
// 	});
// }

export async function readFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => resolve(event.target.result);
		reader.onerror = reject;
		reader.readAsText(file, "UTF-8");
	});
}


export function sample(array, n) {
	let result = new Array(n);
	let len = array.length;
	let taken = new Array(len);

	if (n > len) n = len;

	while (n--) {
		let x = Math.floor(Math.random() * len);
		result[n] = array[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}

	return result;
}

export function tojson(array, directive = 'ndjson') {
	if (directive === 'ndjson') {
		return array.map(JSON.stringify).join('\n');
	} 
	else {
		return array.split('\n').map(JSON.parse);
	}
	
}

  //   https://stackoverflow.com/a/28318964
export function chunkParseFile(file, callback) {
    var fileSize = file.size;
    var chunkSize = 64 * 1024; // bytes
    var offset = 0;
    var self = this; // we need a reference to the current object
    var chunkReaderBlock = null;

    var readEventHandler = function (evt) {
      if (evt.target.error == null) {
        offset += evt.target.result.length;
        callback(evt.target.result); // callback for handling read chunk
      } else {
        console.log("Read error: " + evt.target.error);
        return;
      }
      if (offset >= fileSize) {
        console.log("Done reading file");
        return;
      }

      // of to the next chunk
      chunkReaderBlock(offset, chunkSize, file);
    };

    chunkReaderBlock = function (_offset, length, _file) {
      var r = new FileReader();
      var blob = _file.slice(_offset, length + _offset);
      r.onload = readEventHandler;
      r.readAsText(blob);
    };

    // now let's start the read with the first block
    chunkReaderBlock(offset, chunkSize, file);
  }