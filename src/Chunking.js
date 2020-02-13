import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import testData1 from "./TyphoonHaiyan.json";
// import testData2 from "./TyphoonHaiyan.json";

export default function Chunky(props) {
  const [newData, setNewData] = useState([]);
  const [complete, setCompleted] = useState(false);
  //   var arr = new Array(1000000);
  var arr = testData1.result_content.data;
  //   for (let i = 0; i < arr.length; i++) {
  //     arr[i] = i;
  //   }

  useEffect(() => {
    ProcessArray(arr, HandleSingle, Done);
  }, []);

  var start,
    finish,
    count = 0;
  var storedData = [];

  const Done = () => {
    finish = +new Date();
    setNewData(storedData);
    // setCompleted(true);
    console.log("Total Time in MS: ", finish - start);
    console.log("Records touched: ", count);
    toast.update("fetching", {
      type: toast.TYPE.SUCCESS,
      autoClose: 3000,
      render: "Data Fetch Successful!!"
    });
  };
  const HandleSingle = item => {
    count += 1;
    let itemData = item.data;
    let relaventData = {};
    relaventData.url = itemData.url;
    console.log(relaventData);
    storedData.push(relaventData);
  };
  const ProcessArray = (data, changer, callback) => {
    console.log(data.length);
    // time in mil secs to send things through
    var maxTime = 100;
    // time in mil secs between sedding items
    var delay = 100;
    var queue = data.slice();
    setTimeout(function() {
      var endTime = +new Date() + maxTime;
      do {
        changer(queue.shift());
      } while (queue.length > 0 && endTime > +new Date());
      if (queue.length > 0) {
        setTimeout(() => {
          ProcessArray(queue, changer, callback);
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
