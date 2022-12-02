import React from 'react';
import './Analytics.css';

const Analytics = () => {
  return (
    <section className='analytics-main-container'>
        <div className='analytics-container'>
        <div className='results'>
            <h4>Average time to finish taks:</h4>
            <ul>
                <li>22:15 minutes</li>
            </ul>
        </div>
        <div className='results'>
        <h4>Average time to finish taks by priority:</h4>
        <ul>
               <li>Low: 10:25min</li>
               <li>Medium: 10:25min</li>
               <li>High 10:25min</li>
        </ul>
        </div>
        </div>
    </section>
  )
}

export default Analytics