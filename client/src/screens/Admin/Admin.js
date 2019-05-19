import React from 'react';
import { CREATE_PARTICIPANT, VIEW_PARTICIPANTS } from "../../components/NavBar/routes";
import { Link } from 'react-router-dom';

const exportData = () => {
  console.log('export');
  const currentDate = new Date().toISOString();

  // Fetch data from graphql endpoint, then add headers and export.
  const csvString = '"Participant","Stream","Date Created","Date Updated","Trainer","Activity","Engagement"\n';

    return (<div>        
        <Link to = {CREATE_PARTICIPANT}>Create Partipant</Link>
        <Link to = {VIEW_PARTICIPANTS}>View participants</Link>
        
    </div>
        );

  const file = new Blob([csvString], {type: 'text/csv'});

  let tempLink = document.createElement('a');
  tempLink.setAttribute('href', URL.createObjectURL(file));
  tempLink.setAttribute('download', `export-${currentDate}.csv`);
  tempLink.textContent = 'Download';

  const downloadContainer = document.getElementById('downloadContainer');
  if (downloadContainer.firstChild) {
    downloadContainer.firstChild.remove();
  }
  downloadContainer.appendChild(tempLink);
}

export function AdminPage() {
  return (
  <div>
    <section id="createParticipant">
      <h3>Create Participant</h3>
      <Link to={CREATE_PARTICIPANT}>Create Partipant</Link>
    </section>
    <section id="export">
      <h3>Data Exporter</h3>
      <button onClick={ exportData }>Generate Export</button>
      <div id="downloadContainer"></div>
    </section>
  </div>
  );
}

