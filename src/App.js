import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const SaleArtworksQuery = gql`
  query SaleArtworks($cursor: String) {
    sale_artworks(first: 5, after: $cursor) @connection(key: "saleArtworks") {
      pageInfo {
        hasNextPage,
        endCursor
      }
      edges {
        node {
          id
        }
      }
    }
  }
`

class App extends Component {
  static defaultProps = {
    edges: []
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          Loading
        </div>
      )
    } else {
      const { edges, loadMoreArtworks } = this.props

      return (
        <div>
          <div>
            <h2>
              Sale Artworks Pagination
            </h2>
            <ul>
              {edges.map((saleArtwork, key) => {
                const {
                  node: {
                    id
                  }
                } = saleArtwork

                return (
                  <li key={key}>
                    ID: {id}
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <button onClick={loadMoreArtworks}>
              Load next page
            </button>
          </div>
        </div>
      )
    }
  }
}

const wrapper = graphql(SaleArtworksQuery, {
  props: (props) => {
    const {
      data: {
        loading, fetchMore, sale_artworks
      }
    } = props

    if (!loading) {
      const { edges, pageInfo } = sale_artworks

      return { edges, pageInfo, loadMoreArtworks: () => {
        return fetchMore({
          query: SaleArtworksQuery,
          variables: {
            cursor: pageInfo.endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return fetchMoreResult
          }
        })
      }
    }
  }
}})

export default wrapper(App)
