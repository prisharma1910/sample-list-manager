import React from 'react';

export default class ItemOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title || '',
            desc: this.props.description || '',
        }
        this.updateText = this.updateText.bind(this);
        this.updateDesc = this.updateDesc.bind(this);
    }

    updateText(e){
        this.setState({
            title: e.currentTarget.value
        })
    }

updateDesc(e){
    this.setState({
        desc: e.currentTarget.value
    });
}

    render() {
        return (
            <div className="add-modal">
                <input value={this.state.title} onChange={this.updateText} />
                <input value={this.state.desc} onChange={this.updateDesc} />
                <button onClick={() => this.props.primaryAction(this.state)}> {this.props.primaryActionText} </button>
                {this.props.secondaryAction ? <button onClick={this.props.secondaryAction}> {this.props.secondaryActionText} </button> : null}
                <button onClick={this.props.onCancel}> Cancel </button>
            </div>
        )
    }
}
