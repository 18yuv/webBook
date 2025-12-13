import Bookmark from "../components/Bookmark.jsx";
import Header from "../components/Header.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    return (
        <>
            <Header />
            <div className="top">
                <h4>Items</h4>
                <select name="" id="">
                    <option value="Tags">Tag</option>
                </select>
                <input type="text" /><FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <Bookmark />
            <button>Create New <FontAwesomeIcon icon={faBookmark} /></button>
        </>
    )
}