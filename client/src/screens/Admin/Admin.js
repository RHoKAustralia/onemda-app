import React from 'react'
import { CREATE_PARTICIPANT } from "../../components/NavBar/routes";
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

const CSV_QUERY = gql`query{
  csvExtract
}`;

const exportData = (client) => {
  // Fetch data from graphql endpoint, then add headers and export.
  fetchCsv(client)
    .then(csvString => {
      const file = new Blob([csvString], {type: 'text/csv'});
      appendDownloadLink(file);
    })
    .catch(error => {
      console.error("Error fetching CSV.")
    });
}

const fetchCsv = (client) => {
  return client.query({ query: CSV_QUERY })
    .then(result => {
      console.log(result.data.csvExtract);
      return result.data.csvExtract;
    });
}

const appendDownloadLink = (file) => {
  let tempLink = document.createElement('a');
  const currentDate = new Date().toISOString();
  tempLink.setAttribute('download', `export-${currentDate}.csv`);
  tempLink.setAttribute('href', URL.createObjectURL(file));
  tempLink.textContent = 'Download';

  updateDownloadContainer(tempLink);
}

const updateDownloadContainer = (element) => {
  const downloadContainer = document.getElementById('downloadContainer');
  if (downloadContainer.firstChild) {
    downloadContainer.firstChild.remove();
  }
  downloadContainer.appendChild(element);
}

function AdminPage({ client }) {
  return (
  <div>
    <section id="createParticipant">
      <h3>Create Participant</h3>
      <Link to={CREATE_PARTICIPANT}>Create Partipant</Link>
    </section>
    <section id="export">
      <h3>Data Exporter</h3>
      <button onClick={ () => exportData(client) }>Generate Export</button>
      <div id="downloadContainer"></div>
    </section>
  </div>
  );
}

export default withApollo(AdminPage);

