import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionsPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import {updateCollections} from '../../redux/shop/shops.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionsPage);

class ShopPage extends React.Component{
    state = {
        isLoading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({isLoading: false});
        });
    }

    render(){
        const {match} = this.props;
        const {isLoading} = this.state;

        return(
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={props => (
                        <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
                    )}    
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={props => (
                        <CollectionsPageWithSpinner isLoading={isLoading} {...props} />
                    )} 
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);

