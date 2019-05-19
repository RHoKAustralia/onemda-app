import React, { Component } from 'react';
import Service from '../Service';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './styles.scss';

const SERVICES_QUERY = gql`
  query activities {
    activities {
      name
    }
  }
`

class Services extends Component {
  render() {
    return (
      <Query query={SERVICES_QUERY}>
        {({loading, error, data }) => {
          if (loading) return <div>Fetching data...</div>
          if (error) return <div>Error</div>

          const activities = data.activities
          return (
            <div className="services">
              <h3>Activities</h3>
              <div className="services__preface">Here is a list of all the activities Onemda offers.</div>
              <ul className="services__data">
                {activities.map((activity, index) => <Service key={index} service={activity} />)}
              </ul>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Services
