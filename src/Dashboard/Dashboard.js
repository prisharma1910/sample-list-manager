import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { default as ItemOptions } from './components/ItemOptions';
import { getInitialData, updateListSequence, updateList, updateItem, deleteItem, addNewList } from './Dashboard.actions';
import { default as List } from './components/List';
import './Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.getListItems = this.getListItems.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
        this.saveNewList = this.saveNewList.bind(this);
        this.state = {addList: false};
    }

    componentDidMount() {
        this.props.getInitialList();
    }

    toggleAdd(){
        this.setState({
            addList: !this.state.addList
        })
    }

    saveNewList(data){
        this.props.addList(data);
        this.toggleAdd();
    }

    onDragEnd(result) {
        let sourceList = result.source.droppableId;
        let targetList = result.destination.droppableId;
        let itemId = result.draggableId;
        let sourcePos = result.source.index;
        let targetPos = result.destination.index;
        if (sourceList === targetList) {
            let newSequence = this.props.list[sourceList].sequence;
            newSequence.splice(sourcePos, 1);
            newSequence.splice(targetPos, 0, itemId);
            this.props.updateListItemSeq(sourceList, newSequence);
        } else {
            let sourceListNewSeq = this.props.list[sourceList].sequence;
            sourceListNewSeq.splice(sourcePos, 1);
            let targetListNewSeq = this.props.list[targetList].sequence;
            targetListNewSeq.splice(targetPos, 0, itemId);
            this.props.updateListItemSeq(sourceList, sourceListNewSeq);
            this.props.updateListItemSeq(targetList, targetListNewSeq);
        }
    }

    getListItems(itemSequence) {
        let result = [];
        const { items } = this.props;
        for (let i = 0; i < itemSequence.length; i++) {
            result.push({ ...items[itemSequence[i]], 'itemId': itemSequence[i] });
        }
        return result;
    }

    render() {
        const { list, listOrder } = this.props;
        const listJsx = [];
        if (listOrder) {
            listOrder.forEach((listId, id) => {
                listJsx.push(<List
                    key={listId}
                    listId={listId}
                    listData={list[listId]}
                    getItems={() => this.getListItems(list[listId].sequence)}
                    onUpdateItem={this.props.updateItemData}
                    onDeleteItem={this.props.deleteItem}
                    onAddItem={this.props.addItemOnList}
                />)
            });
        }
        return (
            <React.Fragment>
                <header className="App-header">
                    <span className="board-title">Welcome to List Manager</span>
                    {this.state.addList ?
                    <ItemOptions
                        primaryAction={this.saveNewList}
                        primaryActionText={"Save"}
                        onCancel={this.toggleAdd}
                    /> :
                    <button onClick={this.toggleAdd}>Add List</button>
                }
                </header>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="container">
                        {listJsx}
                    </div>
                </DragDropContext>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { dashboardData } = state;
    return dashboardData.listData ? {
        list: dashboardData.listData,
        items: dashboardData.items,
        listOrder: dashboardData.listOrder.listOrder,
    } : {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInitialList: () => {
            dispatch(getInitialData())
        },
        updateListItemSeq: (listId, newSequence) => {
            dispatch(updateListSequence(listId, newSequence))
        },
        addItemOnList: (listId, updatedData) => {
            dispatch(updateList(listId, updatedData))
        },
        updateItemData: (itemId, updatedData) => {
            dispatch(updateItem(itemId, updatedData))
        },
        deleteItem: (listId, itemId) => {
            dispatch(deleteItem(listId, itemId))
        },
        addList: (listData) => {
            dispatch(addNewList(listData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);