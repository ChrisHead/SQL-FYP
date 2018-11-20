import { observable } from "mobx"
import { observer, inject } from "mobx-react"
import * as React from "react"
import { AppStore } from "."

interface IProps {
  app?: AppStore
}

@inject("app")
@observer
export class LoginPage extends React.Component<IProps> {
  @observable value = ""
  @observable error = ""

  handleSubmit = async e => {
    e.preventDefault()

    const error = await this.props.app!.login(this.value)
    console.log(error)
    if (error) {
      this.error = error
    }
  }

  public render() {
    return (
      <div
        style={{
          height: window.innerHeight,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>LOGIN</h1>
        {this.error}
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              value={this.value}
              onChange={e => (this.value = e.target.value)}
            />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    )
  }
}
