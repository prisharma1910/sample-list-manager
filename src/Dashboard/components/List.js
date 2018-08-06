import React from 'react';
import { default as Item } from './Item';
import { default as ItemOptions } from './ItemOptions';
import { Droppable } from 'react-beautiful-dnd';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdd: false
        }
        this.addItem = this.addItem.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
    }

    toggleAdd() {
        this.setState({
            showAdd: !this.state.showAdd
        })
    }

    addItem(data) {
        this.props.onAddItem(this.props.listId, data);
        this.toggleAdd();
    }

    render() {
        const { listData, getItems, onUpdateItem, onDeleteItem, listId } = this.props;
        const itemJsx = [];
        const items = getItems();
        items.forEach((item, id) => {
            itemJsx.push(<Item key={id} index={id} itemData={item} onUpdateItem={onUpdateItem} onDeleteItem={onDeleteItem} />)
        });
        return (
            <div className="list">
                <span className="list-title"><b>{listData.title}</b></span>
                <Droppable droppableId={listId}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="list"
                        >
                            {itemJsx}
                        </div>)}
                </Droppable>
                {this.state.showAdd ?
                    <ItemOptions
                        primaryAction={this.addItem}
                        primaryActionText={"Save"}
                        onCancel={this.toggleAdd}
                    /> :
                    <button onClick={this.toggleAdd} className="add-list-btn">Add Item</button>
                }
            </div>
        )
    }
}
