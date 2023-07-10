import axios from "axios";
import React, { useEffect } from "react";

export default function Test3() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://43.204.183.31:8000/summarize/url",
          {
            url: "https://www.forbes.com/sites/craigsmith/2023/04/05/mom-dad-i-want-to-be-a-prompt-engineer/?sh=31ca200659c8",
            type: "news",
            length: "high",
          }
        );
        if (response.status === 200 && response.data) {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <div>Test3</div>;
}
