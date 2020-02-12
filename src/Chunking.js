import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import testData1 from "./TyphoonHaiyan.json";
// import testData2 from "./TyphoonHaiyan.json";

export default function Chunky(props) {
  const [newData, setNewData] = useState([]);
  const [complete, setCompleted] = useState(false);
  var arr = new Array(10000);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = i;
  }

  useEffect(() => {
    // ProcessArray(testData1.result_content.data, HandleSingle, Done);
    ProcessArray(arr, HandleSingle, Done);
  }, []);

  var start, finish;
  var storedData = [];

  const Done = () => {
    finish = +new Date();
    setNewData(storedData);
    setCompleted(true);
    console.log("Started at: ", start);
    console.log("Finished at: ", finish);
    console.log("Total Time: ", finish - start);
    toast.update("fetching", {
      type: toast.TYPE.SUCCESS,
      autoClose: 3000,
      render: "Data Fetch Successful!!"
    });
  };
  const HandleSingle = item => {
    console.log(item);
    storedData.push(item);
  };
  const ProcessArray = (data, changer, callback) => {
    var maxTime = 30;
    var delay = 5000;
    var queue = data.slice();
    setTimeout(function() {
      var endTime = +new Date() + maxTime;
      do {
        changer(queue.shift());
      } while (queue.length > 0 && endTime > +new Date());
      if (queue.length > 0) {
        setTimeout(() => {
          ProcessArray(queue, HandleSingle, Done);
        }, delay);
      } else {
        if (callback) callback();
      }
    }, delay);
  };

  start = +new Date();
  toast.info("Fetching Data", {
    toastId: "fetching"
  });

  return (
    <div>
      <h2>This is Chunky</h2>
      {complete ? <div>{newData}</div> : null}
    </div>
  );
}
