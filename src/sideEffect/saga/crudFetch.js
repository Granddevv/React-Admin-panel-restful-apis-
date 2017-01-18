import { put, call, cancelled, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    FETCH_START,
    FETCH_END,
    FETCH_ERROR,
    FETCH_CANCEL,
} from '../../actions/fetchActions';

const crudFetch = (restClient) => {
    function *handleFetch(action) {
        const { type, payload, meta } = action;
        const restType = meta.fetch;
        delete meta.fetch;
        yield [
            put({ type: `${type}_LOADING`, payload, meta }),
            put({ type: FETCH_START }),
        ];
        let response;
        try {
            response = yield call(restClient, restType, meta.resource, payload);
            yield put({
                type: `${type}_SUCCESS`,
                payload: response,
                requestPayload: payload,
                meta: { ...meta, fetchResponse: true },
            });
            yield put({ type: FETCH_END });
        } catch (error) {
            yield put({
                type: `${type}_FAILURE`,
                error: error.message ? error.message : error,
                requestPayload: payload,
                meta: { ...meta, fetchResponse: true },
            });
            yield put({ type: FETCH_ERROR });
        } finally {
            if (yield cancelled()) {
                yield put({ type: FETCH_CANCEL });
                return; /* eslint no-unsafe-finally:0 */
            }
        }
    }

    return function *watchCrudFetch() {
        yield [
            takeLatest(action => action.meta && action.meta.fetch && action.meta.cancelPrevious, handleFetch),
            takeEvery(action => action.meta && action.meta.fetch && !action.meta.cancelPrevious, handleFetch),
        ];
    };
};


export default crudFetch;
