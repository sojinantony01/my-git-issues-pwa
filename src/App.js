import React, { useEffect, useState } from 'react';
import { Octokit }  from "octokit"

import './App.css';
import config from './config';

function App() {
  const [issues, setIssues] = useState([])
  useEffect(() => {
    const fetchData = async () => {
    // Octokit.js
    // https://github.com/octokit/core.js#readme
      const  octokit = new Octokit({
        // auth: config.token
      })

      const values = await octokit.request('GET /repos/sojinantony01/react-cron-generator/issues', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        filter: "all"
      })
      setIssues(values.data)
    }
    fetchData()
  }, [])
  return (
    <div className="App">
        {issues.map(d => 
          <div class="card">
          <div class="container">
            {/* <h4><b>{d.repository.name}</b></h4> */}
            <div><a href={d.url} >{d.title}</a> </div>
            <div><p>{d.assignee}</p> <p>{d.status}</p></div> 
            <div><a href={d.comments_url}>Comments</a></div>
          </div>
        </div>
        )}
        
    </div>
  );
}

export default App;
