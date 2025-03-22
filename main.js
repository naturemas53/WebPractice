/*
    作成者 licrosea
    Web上3d実装 エントリポイント
*/

import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if (WebGL.isWebGL2Available())
{
    excuteShow3D();
}
else
{
    alert("このブラウザでは3D表示に対応していません。")
}

function excuteShow3D()
{
    // THREE使用時、シーン　カメラ　レンダラー　の３つが必要
    // 大体new演算子で作れる　はず
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );
    
    // テスト表示用のキューブを作成していく
    const geometry = new THREE.BoxGeometry( 1,1,1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    camera.position.z = 5;

    // レンダーループ or アニメーションループを明示的に呼び出さないと表示されない
    // Tips:THREEで使っているWebGLRenderer-reqquestAnimationFrame は、
    //      タブ移動時、戻ってくるまで描画処理が一時停止されるらしい 
    function animate()
    {
        // これ呼び出しで初めて描画される
        renderer.render( scene, camera ); 
        
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
    // この関数で、毎フレ更新で呼び出す関数を登録する
    renderer.setAnimationLoop(animate);
}

// 保留中 次は下記URLのステップから
// https://threejs.org/docs/#manual/en/introduction/Drawing-lines