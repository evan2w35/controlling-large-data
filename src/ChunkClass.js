import React, { Component } from "react";
import { toast } from "react-toastify";
import testData1 from "./TyphoonHaiyan.json";
import testData2 from "./TyphoonHaiyan.json";
import testData3 from "./TyphoonHaiyan.json";
import testData4 from "./TyphoonHaiyan.json";
import testData5 from "./TyphoonHaiyan.json";

export default class Chunking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newData: new Array(1000000),
      complete: false
    };
  }

  componentDidMount() {
    toast.info("Fetching Data", { toastId: "fetching" });
    for (let i = 0; i < this.state.newData.length; i++) {
      this.setState(() => {
        this.state.newData[i] = i;
      });
    }
    this.ProcessArray(this.state.newData, this.HandleSingle, this.Done);
  }

  HandleSingle = item => {
    console.log(item);
    let copy = this.state.newData.concat(item);
    this.setState(() => {
      this.state.newData = copy;
    });
  };

  Done = () => {
    this.setState(() => {
      this.state.complete = true;
    });
    toast.update("fetching", {
      type: toast.TYPE.SUCCESS,
      autoClose: 3000,
      render: "Data Fetch Successful!!"
    });
    console.log("DONE");
  };

  ProcessArray = (data, changer, callback) => {
    var maxTime = 300;
    var delay = 30;
    var queue = data.concat();
    setTimeout(function() {
      var endTime = +new Date() + maxTime;
      do {
        changer(queue.shift());
      } while (queue.length > 0 && endTime > +new Date());
      if (queue.length > 0) {
        setTimeout(arguments.callee, delay);
      } else {
        if (callback) callback();
      }
    }, delay);
  };

  render() {
    var { newData, complete } = this.state;
    console.log(newData.length);

    return (
      <div>
        <h4>this is chunky2 class</h4>
        {complete ? <div>{newData}</div> : null}
      </div>
    );
  }
}
