import React from 'react';
import { default as ItemOptions } from './ItemOptions';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEdit: false
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
    }

    toggleEdit() {
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    updateItem(data) {
        this.props.onUpdateItem(this.props.itemData.itemId, data);
        this.toggleEdit();
    }

    onDeleteItem() {
        this.props.onDeleteItem(this.props.itemData.itemId);
        this.toggleEdit();
    }


    render() {
        const { itemData } = this.props;

        return (
            <div className="item">
                <span className="item-title">{itemData.title} </span>
                <span className="item-desc">{itemData.desc}</span>
                {this.state.showEdit ?
                    <ItemOptions
                        key={itemData.itemId}
                        title={itemData.title}  
                        description={itemData.desc}
                        primaryAction={this.updateItem}
                        secondaryAction={this.onDeleteItem}
                        primaryActionText={"Save"}
                        secondaryActionText={"Delete"}
                        onCancel={this.toggleEdit}
                    /> :
                    <button onClick={this.toggleEdit} className="edit-item-btn">edit</button>
                }
            </div>
        )
    }
}