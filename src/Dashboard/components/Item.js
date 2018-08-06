import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

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
        const { itemData, index } = this.props;

        return (
            <Draggable
                key={itemData.itemId}
                draggableId={itemData.itemId}
                index={index}
            >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className="item"
                    >
                        <span className="item-title">{itemData.title} </span>
                        <span className="item-desc">{itemData.desc}</span>
                        {provided.placeholder}
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
                    </div>)}
            </Draggable>
        )
    }
}