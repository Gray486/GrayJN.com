import "./App.css";
import { getPageFromKey, usePage } from "./pageManager";

function App() {
    const { pageKey } = usePage();

    return (
        <div>
            <main>
                {getPageFromKey(pageKey)}
            </main>
        </div>
    );
}

export default App;
