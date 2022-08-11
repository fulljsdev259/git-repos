import { useEffect, useMemo, useState } from "react";
import Organizations from "./components/organizations";
import "./index.css";
import { debounce } from "./utils";


//generic error message
const ERROR_MESSAGE = "Not Found";

const initialState = {
  organization: "hoppscotch",
  list: [],
  error: "",
  loading: true
};

export default function App() {
  const [state, setState] = useState(initialState);

  const getOrganations = (orgaName) => {
    setState((pre) => ({ ...pre, loading: true }));
    fetch(`https://api.github.com/orgs/${orgaName}/repos`, {
      method: "GET",
      headers: {
        Authorization: "token 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"
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message === ERROR_MESSAGE) {
          setState((pre) => ({ ...pre, list: [], error: res.message }));
        } else {
          setState((pre) => ({ ...pre, list: res, error: "" }));
        }
      })
      .catch((err) => {
        setState((pre) => ({ ...pre, list: [], error: err.message }));
      })
      .finally(() => {
        setState((pre) => ({ ...pre, loading: false }));
      });
  };

  useEffect(() => {
    getOrganations(state.organization);
  }, []);

  const debounceGetOrganitions = debounce(getOrganations, 2000);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let data = { ...state };
    data[name] = value;
    if (value.trim()) {
      debounceGetOrganitions(value);
    } else {
      data = { ...initialState, ...data };
    }
    setState(data);
  };

  const renderList = useMemo(() => {
    if (state.loading) {
      return <h3>Loading...</h3>;
    }

    if (state.list.length && state.organization) {
      return <Organizations list={state.list} />;
    }

    if (state.organization && state.error) {
      return (
        <div>
          Looks like you don't have any Organisation or Organization's
          repository
        </div>
      );
    }

    return <div>Your Organisation's repository will show here</div>;
  }, [state]);

  return (
    <div className="container">
      <div className="App">
        <h2>Enter git organization name</h2>
        <input
          placeholder="Enter organization name..."
          name="organization"
          className="search-input"
          value={state.organization}
          onChange={handleChange}
        />
        {renderList}
      </div>
    </div>
  );
}
