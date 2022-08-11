import React from 'react'

const Organizations = ({ list }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Organisation</th>
            <th>Language</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={item.name + index}>
                <td>{item.name}</td>
                <td>{item.language}</td>
                <td>{item.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  export default Organizations;