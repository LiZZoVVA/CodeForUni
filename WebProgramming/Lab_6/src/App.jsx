import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const app = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const query = searchQuery.toLowerCase().trim(); 
    return users.filter(user => {
      return (
        user.id.toString().includes(query) ||
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.website.toLowerCase().includes(query) ||
        user.address.street.toLowerCase().includes(query) ||
        user.address.suite.toLowerCase().includes(query) ||
        user.address.city.toLowerCase().includes(query) ||
        user.address.zipcode.toLowerCase().includes(query) ||
        user.address.geo.lat.includes(query) ||
        user.address.geo.lng.includes(query) ||
        user.company.name.toLowerCase().includes(query) ||
        user.company.catchPhrase.toLowerCase().includes(query) ||
        user.company.bs.toLowerCase().includes(query)
      );
    });
  }, [users, searchQuery]);
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      let aValue, bValue;
      switch (key) {
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'address':
          aValue = `${a.address.street}, ${a.address.city}`;
          bValue = `${b.address.street}, ${b.address.city}`;
          break;
        case 'city':
          aValue = a.address.city;
          bValue = b.address.city;
          break;
        case 'zipcode':
          aValue = a.address.zipcode;
          bValue = b.address.zipcode;
          break;
        case 'geo':
          aValue = a.address.geo.lat;
          bValue = b.address.geo.lat;
          break;
        case 'company':
          aValue = a.company.name;
          bValue = b.company.name;
          break;
        case 'catchPhrase':
          aValue = a.company.catchPhrase;
          bValue = b.company.catchPhrase;
          break;
        case 'bs':
          aValue = a.company.bs;
          bValue = b.company.bs;
          break;
        default:
          aValue = a[key];
          bValue = b[key];
      } 
      if (direction === 'asc') {
        return aValue.toString().localeCompare(bValue.toString());
      } else {
        return bValue.toString().localeCompare(aValue.toString());
      }
    });
    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };
  if (loading) {
    return (
      <div className="loadingcontainer">
        <div className="loadingspinner">Loading users...</div>
      </div>
    );
  }
  return (
    <div className="app">
      <div className="searchcontainer">
        <div className="searchinputwrapper">
          <input type="text" placeholder="Enter name, email, company, address, phone, username, website..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="searchinput"/>
          {searchQuery && (
            <button className="clearsearch" onClick={() => setSearchQuery('')}title="Clear search"> ✕ </button>
          )}
        </div>
        <div className="searchstats">
          <span className="usercount">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
            {searchQuery && ` for "${searchQuery}"`}
          </span>
        </div>
      </div>
      <div className="tablecontainer">
        <table className="usertable">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="sortable">
                ID {getSortIcon('id')}
              </th>
              <th onClick={() => handleSort('name')} className="sortable">
                Name {getSortIcon('name')}
              </th>
              <th onClick={() => handleSort('username')} className="sortable">
                Username {getSortIcon('username')}
              </th>
              <th onClick={() => handleSort('email')} className="sortable">
                Email {getSortIcon('email')}
              </th>
              <th onClick={() => handleSort('phone')} className="sortable">
                Phone {getSortIcon('phone')}
              </th>
              <th onClick={() => handleSort('website')} className="sortable">
                Website {getSortIcon('website')}
              </th>
              <th onClick={() => handleSort('address')} className="sortable">
                Address {getSortIcon('address')}
              </th>
              <th onClick={() => handleSort('city')} className="sortable">
                City {getSortIcon('city')}
              </th>
              <th onClick={() => handleSort('zipcode')} className="sortable">
                Zipcode {getSortIcon('zipcode')}
              </th>
              <th onClick={() => handleSort('geo')} className="sortable">
                Coordinates {getSortIcon('geo')}
              </th>
              <th onClick={() => handleSort('company')} className="sortable">
                Company {getSortIcon('company')}
              </th>
              <th onClick={() => handleSort('catchPhrase')} className="sortable">
                Catchphrase {getSortIcon('catchPhrase')}
              </th>
              <th onClick={() => handleSort('bs')} className="sortable">
                Business {getSortIcon('bs')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="userrow">
                  <td className="userid">#{user.id}</td>
                  <td className="username">
                    <div className="namecontainer">
                      <div className="primaryname">{user.name}</div>
                    </div>
                  </td>
                  <td className="userusername">
                    <span className="usernamebadge">@{user.username}</span>
                  </td>
                  <td className="useremail">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td className="userphone">{user.phone}</td>
                  <td className="userwebsite">
                    <a 
                      href={`http://${user.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title={`Visit ${user.website}`}
                    >
                      {user.website}
                    </a>
                  </td>
                  <td className="useraddress">
                    <div className="addressinfo">
                      <div className="street">{user.address.street}</div>
                      <div className="suite">{user.address.suite}</div>
                    </div>
                  </td>
                  <td className="usercity">{user.address.city}</td>
                  <td className="userzipcode">{user.address.zipcode}</td>
                  <td className="usercoordinates">
                    <div className="geoinfo">
                      <div>Lat: {user.address.geo.lat}</div>
                      <div>Lng: {user.address.geo.lng}</div>
                    </div>
                  </td>
                  <td className="usercompany">
                    <div className="companyinfo">
                      <div className="companyname">{user.company.name}</div>
                    </div>
                  </td>
                  <td className="usercatchphrase">
                    <div className="catchphrasetext">"{user.company.catchPhrase}"</div>
                  </td>
                  <td className="userbs">
                    <div className="bstext">{user.company.bs}</div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="noresults">
                  <div className="nosmessage">
                    <h3>No users found for "{searchQuery}"</h3>
                    <p> Enter name, email, company, address ...</p>
                    <button className="clearbtn" onClick={() => setSearchQuery('')}>
                      Clear search
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default app;