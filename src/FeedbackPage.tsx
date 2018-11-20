import React from "react"
import { Link } from "react-router-dom"

export class FeedbackPage extends React.Component {
  handleSubmit = async e => {
    e.preventDefault()
  }
  public render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flex: 1, alignItems: "flex-start" }}>
          <Link
            className="button"
            to="/"
            style={{ display: "flex", margin: 20, padding: 15 }}
          >
            Return
          </Link>
        </div>
        <div
          style={{
            height: window.innerHeight,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Feedback</h1>
          <form onSubmit={this.handleSubmit} style={{ flexDirection: "row" }}>
            <textarea
              wrap="true"
              style={{ height: 200, width: 570, resize: "none" }}
            />
          </form>
          <input style={{ margin: 8 }} type="submit" value="Submit" />
        </div>
        <div style={{ flex: 1 }} />
      </div>
    )
  }
}
