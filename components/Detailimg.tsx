import React from 'react';

const Detailimg = () => {
    return (
        <form>
            <div className="yourClassName">
                <label htmlFor="file">사진첨부</label>
                <input className="hidden" type="file" multiple accept="image/*" />
            </div>
        </form>
    );
}

export default Detailimg;
