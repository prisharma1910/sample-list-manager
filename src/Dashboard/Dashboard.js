import React from 'react';
import { connect } from 'react-redux';
import { getInitialData, updateListSequence, updateList, updateItem, deleteItem } from './Dashboard.actions';
import { default as List } from './components/List';
import './Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.getListItems = this.getListItems.bind(this);
    }

    componentDidMount(){
        this.props.getInitialList();
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
        if(listOrder){
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
            <div className="container">
                {listJsx}
            </div>
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
        updateListSeq: (newSequence) => {
            dispatch(updateListSequence(newSequence))
        },
        addItemOnList: (listId, updatedData) => {
            dispatch(updateList(listId, updatedData))
        },
        updateItemData: (itemId, updatedData) => {
            dispatch(updateItem(itemId, updatedData))
        },
        deleteItem: (listId, itemId) => {
            dispatch(deleteItem(listId, itemId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);