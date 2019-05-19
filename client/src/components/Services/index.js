import React, { Component } from 'react'
import Service from '../Service'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

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
              Activities
              <div>Here is a list of all the activities Onemda offers</div>
              {activities.map(activity => <Service key={activity.id} service={activity} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Services