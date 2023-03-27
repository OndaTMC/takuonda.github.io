const inputBox = document.getElementById("input-box");//変数にHTML上の情報を格納
const listContainer = document.getElementById("list-container");

function addTask() { //タスクを追加する関数を宣言
    if (inputBox.value === "") { //text boxからの情報の取得には.valueを使用
        alert("タスクを入力してください"); //text boxに何も入力がなければ"タスクを入力してください"とalertで表示
    } else {
        let li = document.createElement("li"); //変数にHTML上にliを作成して格納
        li.innerHTML = inputBox.value; //変数に入力データを格納
        listContainer.append(li); //listContainerにappendによって追加（appendは文字列も追加することができる）
        let span = document.createElement("span");//変数にHTML上にspanを作成して格納
        span.innerHTML = "\u00d7" //変数に×マークを格納
        li.appendChild(span); //liの末尾にspanを追加（appendChildは親要素の末尾に追加）
    }
    inputBox.value = ""; //text boxを空欄に変更
    saveData();
}

listContainer.addEventListener("click", function (e) { //listContainerがクリックされたら関数を実行する
    //(target: インターフェイスの読み取り専用プロパティで、イベントが配信されたオブジェクトへの参照です。)
    if (e.target.tagName === "LI") { //LIがクリックされたら　(tagname: tagName は Element インターフェイスのプロパティで、呼び出された要素のタグ名を返します。)
        e.target.classList.toggle("checked"); //CSSで設定した"checked"に変更 (toggle: 特定要素の状態を切り替える)
        saveData();
    } else if (e.target.tagName === "SPAN") { //SPANがクリックされたら
        e.target.parentElement.remove(); // DOM ノードの親である要素 (Element) を消去
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML); //""のkeyとvalueペアでlocalStorageに保存
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data"); //keyによってlocalStorageに保存したdataをlistContainerに表示
}

showTask();
// localStorage.clear(); //localStorageのクリア（バク等の対応用）
