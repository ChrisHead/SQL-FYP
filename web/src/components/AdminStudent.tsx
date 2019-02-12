import * as React from "react"
import { DbStore } from "src/stores/DbStore"
import { observable } from "mobx"
import { observer, inject } from "mobx-react"

interface IProps {
  db?: DbStore
}

@inject("db")
@observer
export class AdminStudent extends React.Component<IProps> {
  @observable value = ""
  // @observable error = ""

  handleNewUserSubmit = async e => {
    e.preventDefault()
    console.log(this.value)
    this.props.db!.students.push({ userId: this.value })
    this.value = ""
    this.props.db!.students.forEach(element => {
      console.log(element.userId)
    })
  }

  render() {
    return (
      <div>
        <div
          style={{
            padding: 8,
            backgroundColor: "#30434d",
            margin: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex" }}>View Students --ADD TABLE--</div>
        </div>
        <div
          style={{
            padding: 8,
            backgroundColor: "#30434d",
            margin: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex" }}>Add New Student</div>
          <div style={{ display: "flex" }}>
            <form onSubmit={this.handleNewUserSubmit}>
              <input
                value={this.value}
                onChange={e => (this.value = e.target.value)}
                required
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div
          style={{
            padding: 8,
            backgroundColor: "#30434d",
            margin: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex" }}>Remove Student Student</div>
          <div>
            <form>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
