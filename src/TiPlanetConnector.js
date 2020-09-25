
import profile from './pages/omega-ide/src/img/profile.png'

/**
 * Local storage connector class. Dummy connector for dev.
 *
 * @author Maxime "M4x1m3" FRIESS
 * @license MIT
 */
export default class TiPlanetConnector {
    static __instance = null;
    static __allowed_chars_file = "abcdefghijklmnopqrstuvwxyz1234567890_";
    static __init_file_content = "from math import *\n";
    
    static __init_projects = decodeURIComponent(escape(window.atob("eyJMYWJ5IjpbeyJuYW1lIjoibGFieXRlc3QucHkiLCJjb250ZW50IjoiZnJvbSBtYXRoIGltcG9ydCAqXG4jY2FzXG5mcm9tIGxhYnkgaW1wb3J0ICpcblxuZGVmIGNoZW1pbigpOlxuICBhID0gMS41NzA3OTYzMjY3OTQ4OTY2XG4gIGF2YW5jZXIoMS41KVxuICBhX2Ryb2l0ZShhKVxuICBhdmFuY2VyKDEpXG4gIGFfZ2F1Y2hlKGEpXG4gIGF2YW5jZXIoMSlcbiAgYV9kcm9pdGUoYSlcbiAgYXZhbmNlcigyKVxuICBhX2dhdWNoZShhKVxuICBhdmFuY2VyKDEpXG4gIGFfZHJvaXRlKGEpXG4gIGF2YW5jZXIoNClcbiAgYV9nYXVjaGUoYSlcbiAgYXZhbmNlcigyKVxuICBhX2Ryb2l0ZShhKVxuICBhdmFuY2VyKDEpXG4gIGFfZ2F1Y2hlKGEpXG4gIGF2YW5jZXIoMylcbiAgYV9nYXVjaGUoYSlcbiAgYXZhbmNlcigxKVxuICBhX2Ryb2l0ZShhKVxuICBhdmFuY2VyKDQpXG4gIGFfZ2F1Y2hlKGEpXG4gIGF2YW5jZXIoMilcbiAgYV9kcm9pdGUoYSlcbiAgYXZhbmNlcigyKVxuICBhX2dhdWNoZShhKVxuICBhdmFuY2VyKDEpXG4gIGFfZHJvaXRlKGEpXG4gIGF2YW5jZXIoMSlcbiAgYV9kcm9pdGUoYSlcbiAgYXZhbmNlcigzKVxuICBhX2dhdWNoZShhKVxuICBhdmFuY2VyKDEpXG4gIGFfZHJvaXRlKGEpXG4gIGF2YW5jZXIoMSlcbiAgYV9nYXVjaGUoYSlcbiAgYXZhbmNlcigxKVxuICBhX2Ryb2l0ZShhKVxuICBhdmFuY2VyKDEpXG4gIGFfZHJvaXRlKGEpXG4gIGF2YW5jZXIoMSlcbiAgYV9nYXVjaGUoYSlcbiAgYXZhbmNlcigxKVxuICBhX2dhdWNoZShhKVxuICBhdmFuY2VyKDIpXG4gIGFfZHJvaXRlKGEpXG4gIGF2YW5jZXIoMSlcbiAgYV9nYXVjaGUoYSlcbiAgYXZhbmNlcigxLjUpXG4ifSx7Im5hbWUiOiJwb2x5Y2FsYy5weSIsImNvbnRlbnQiOiJmcm9tIG1hdGggaW1wb3J0ICpcbiNjYXNcbmRlZiBjb2wzXzJfcmdiKGMsIGJpdHMsIGJncik6XG4gIHJldHVybiBjWzIqYmdyXS8vMioqKDggLSBiaXRzWzBdKSArIGNbMV0vLzIqKig4IC0gYml0c1sxXSkqMioqYml0c1swXSArIGNbMioobm90IGJncildLy8yKiooOC1iaXRzWzJdKSoyKiooYml0c1swXSArIGJpdHNbMV0pXG5kZWYgaHBfZHJhd19saW5lKHgxLCB5MSwgeDIsIHkyLCBjKTpcbiAgbGluZV9wKHgxLCB5MSwgeDIsIHkyLCBjb2wzXzJfcmdiKGMsIFs4LCA4LCA4XSwgMSkpXG5kZWYgaHBfZmlsbF9yZWN0KHgsIHksIHcsIGgsIGMpOlxuICByZWN0X3AoeCwgeSwgeCArIHcsIHkgKyBoLCBjb2wzXzJfcmdiKGMsIFs4LCA4LCA4XSwgMSkpXG5kZWYga2MxX2RyYXdfbGluZSh4MSwgeTEsIHgyLCB5MiwgYyk6XG4gIGRyYXdfbGluZShpbnQoeDEpLCBpbnQoeTEpLCBpbnQoeDIpLCBpbnQoeTIpLCBub3QgY29sM18yX3JnYihjLCBbMSwgMSwgMV0sIDApKVxuZGVmIGtjMTZfZHJhd19saW5lKHgxLCB5MSwgeDIsIHkyLCBjKTpcbiAgZHJhd19saW5lKGludCh4MSksIGludCh5MSksIGludCh4MiksIGludCh5MiksIGNvbDNfMl9yZ2IoYywgWzUsIDYsIDVdLCAxKSlcbmRlZiBocF9jbGVhbl9zY3JlZW4oKTpcbiAgcmVjdF9wKDAsIDAsIDMxOSwgMjM5LCAxNjc3NzIxNSlcbmRlZiBocF9wYXVzZSgpOlxuICB3YWl0KClcblxudGNhbnZhcyA9IE5vbmVcblxuZGVmIGdldF9pbmZvcygpOlxuICBnbG9iYWwgaHBfZHJhd19saW5lLCBocF9maWxsX3JlY3QsIGtjMV9kcmF3X2xpbmUsIGtjMTZfZHJhd19saW5lLCBocF9jbGVhbl9zY3JlZW4sIGhwX3BhdXNlLCB0Y2FudmFzXG4gIGZub3AgPSBsYW1iZGEgOiBOb25lXG4gIHNjcmVlbl93LCBzY3JlZW5faCwgc2NyZWVuX3kwLCBjb2xvcl9iaXRzLCBwb2x5X3NldF9waXhlbCwgcG9seV9zaG93LCBwb2x5X2RyYXdfbGluZSwgcG9seV9maWxsX3JlY3QsIHBvbHlfY2xlYW5fc2NyZWVuLCBwb2x5X3BhdXNlLCBuZWVkX2NsZWFuLCBuZWVkX3BhdXNlLCBuZWVkX2xpbmUsIG5lZWRfcmVjdCA9IDAsIDAsIDAsIFs1LCA2LCA1XSwgZm5vcCwgZm5vcCwgZm5vcCwgZm5vcCwgZm5vcCwgZm5vcCwgMCwgMCwgMSwgMVxuICB0cnk6XG4gICAgaWYgY2hyKDI1Nik9PWNocigwKTogIyBLaGlDQVMgUHl0aG9uIGNvbXBhdC5cbiAgICAgIG5lZWRfbGluZSA9IDBcbiAgICAgIGlmIFwiSFBcIiBpbiB2ZXJzaW9uKCk6XG4gICAgICAgIGtjMV9kcmF3X2xpbmUsIGtjMTZfZHJhd19saW5lID0gTm9uZSwgTm9uZVxuICAgICAgICBzY3JlZW5fdywgc2NyZWVuX2gsIG5lZWRfcGF1c2UsIG5lZWRfcmVjdCA9IDMyMCwgMjQwLCAxLCAwXG4gICAgICAgIGRlZiBwb2x5X3NldF9waXhlbCh4LCB5LCBjKTpcbiAgICAgICAgICBzZXRfcGl4ZWwoeCwgeSwgY29sM18yX3JnYihjLCBbOCwgOCwgOF0sIDEpKVxuICAgICAgICBwb2x5X2RyYXdfbGluZSA9IGhwX2RyYXdfbGluZVxuICAgICAgICBwb2x5X2ZpbGxfcmVjdCA9IGhwX2ZpbGxfcmVjdFxuICAgICAgICBwb2x5X2NsZWFuX3NjcmVlbiA9IGhwX2NsZWFuX3NjcmVlblxuICAgICAgICBwb2x5X3BhdXNlID0gaHBfcGF1c2VcbiAgICAgIGVsc2U6ICMgR3JhcGggMzUrRSBJSSAvIE51bVdvcmtzIG9yIE5zcGlyZSAvIEdyYXBoIDkwK0VcbiAgICAgICAgaHBfZHJhd19saW5lLCBocF9maWxsX3JlY3QsIGhwX2NsZWFuX3NjcmVlbiwgaHBfcGF1c2UgPSBOb25lLCBOb25lLCBOb25lLCBOb25lXG4gICAgICAgIHQxLCB0MiwgbmVlZF9jbGVhbiA9IG5vdCB3aGl0ZSwgXCJOdW13b3Jrc1wiIGluIHZlcnNpb24oKSBvciBcIk5zcGlyZVwiIGluIHZlcnNpb24oKSwgMVxuICAgICAgICBzY3JlZW5fdywgc2NyZWVuX2ggPSAzODQgLSB0Mio2NCAtIHQxKjI1NiwgMTkyICsgdDIqMzAgLSB0MSoxMjhcbiAgICAgICAgaWYgdDE6XG4gICAgICAgICAga2MxNl9kcmF3X2xpbmUgPSBOb25lXG4gICAgICAgICAgZGVmIHBvbHlfc2V0X3BpeGVsKHgsIHksIGMpOlxuICAgICAgICAgICAgc2V0X3BpeGVsKHgsIHksIG5vdCBjb2wzXzJfcmdiKGMsIFsxLDEsMV0sIDApKVxuICAgICAgICAgIHBvbHlfZHJhd19saW5lID0ga2MxX2RyYXdfbGluZVxuICAgICAgICBlbHNlOlxuICAgICAgICAgIGtjMV9kcmF3X2xpbmUgPSBOb25lXG4gICAgICAgICAgZGVmIHBvbHlfc2V0X3BpeGVsKHgsIHksIGMpOlxuICAgICAgICAgICAgc2V0X3BpeGVsKHgsIHksIGNvbDNfMl9yZ2IoYywgWzUsNiw1XSwgMCkpXG4gICAgICAgICAgcG9seV9kcmF3X2xpbmUgPSBrYzE2X2RyYXdfbGluZVxuICBleGNlcHQ6XG4gICAgcGFzc1xuICBpZiBub3Qgc2NyZWVuX3c6XG4gICAgaHBfZHJhd19saW5lLCBocF9maWxsX3JlY3QsIGtjMV9kcmF3X2xpbmUsIGtjMTZfZHJhd19saW5lLCBocF9jbGVhbl9zY3JlZW4sIGhwX3BhdXNlID0gTm9uZSwgTm9uZSwgTm9uZSwgTm9uZSwgTm9uZSwgTm9uZVxuICAgIHRyeTpcbiAgICAgIGltcG9ydCBzeXNcbiAgICAgIHRyeTpcbiAgICAgICAgaWYgc3lzLnBsYXRmb3JtID09IFwibnNwaXJlXCIgb3Igc3lzLnBsYXRmb3JtID09IFwibnVtd29ya3NcIjpcbiAgICAgICAgICB0cnk6ICMgS2hpQ0FTIE1pY3JvcHl0aG9uXG4gICAgICAgICAgICBpbXBvcnQgZ3JhcGhpY1xuICAgICAgICAgICAgZGVmIHBvbHlfZHJhd19saW5lKHgxLCB5MSwgeDIsIHkyLCBjKTpcbiAgICAgICAgICAgICAgZ3JhcGhpYy5kcmF3X2xpbmUoaW50KHgxKSwgaW50KHkxKSwgaW50KHgyKSwgaW50KHkyKSwgY29sM18yX3JnYihjLCBjb2xvcl9iaXRzLCAxKSlcbiAgICAgICAgICAgIGRlZiBwb2x5X2ZpbGxfcmVjdCh4MSwgeTEsIHgyLCB5MiwgYyk6XG4gICAgICAgICAgICAgIGdyYXBoaWMuZHJhd19maWxsZWRfcmVjdGFuZ2xlKGludCh4MSksIGludCh5MSksIGludCh4MiksIGludCh5MiksIGMpXG4gICAgICAgICAgICBzY3JlZW5fdywgc2NyZWVuX2gsIHBvbHlfc2V0X3BpeGVsLCBuZWVkX2NsZWFuLCBuZWVkX2xpbmUsIG5lZWRfcmVjdCA9IDMyMCwgMjIyLCBncmFwaGljLnNldF9waXhlbCwgMSwgMCwgMFxuICAgICAgICAgIGV4Y2VwdDogIyBOc3BpcmUgTWljcm9QeXRob25cbiAgICAgICAgICAgIGltcG9ydCBuc3BcbiAgICAgICAgICAgIHNjcmVlbl93LCBzY3JlZW5faCwgbmVlZF9jbGVhbiwgbmVlZF9wYXVzZSA9IDMyMCwgMjQwLCAxLCAxXG4gICAgICAgICAgICB0Y2FudmFzID0gbnNwLlRleHR1cmUoc2NyZWVuX3csIHNjcmVlbl9oLCAwKVxuICAgICAgICAgICAgZGVmIHBvbHlfc2V0X3BpeGVsKHgsIHksIGMpOlxuICAgICAgICAgICAgICB0Y2FudmFzLnNldFB4KHgsIHksIGNvbDNfMl9yZ2IoYywgY29sb3JfYml0cywgMSkpXG4gICAgICAgICAgICBwb2x5X3Nob3csIHBvbHlfcGF1c2UgPSB0Y2FudmFzLmRpc3BsYXksIG5zcC53YWl0S2V5cHJlc3NcbiAgICAgICAgZWxpZiBzeXMucGxhdGZvcm0gPT0gXCJUSS1Oc3BpcmVcIjogIyBDWCBJSVxuICAgICAgICAgIGltcG9ydCB0aV9pbWFnZVxuICAgICAgICAgIHNjcmVlbl93LCBzY3JlZW5faCA9IDMxOCwgMjEyXG4gICAgICAgICAgdGNhbnZhcyA9IHRpX2ltYWdlLm5ld19pbWFnZShzY3JlZW5fdywgc2NyZWVuX2gsICgyNTUsIDI1NSwgMjU1KSlcbiAgICAgICAgICBkZWYgcG9seV9zZXRfcGl4ZWwoeCwgeSwgYyk6XG4gICAgICAgICAgICB0Y2FudmFzLnNldF9waXhlbCh4LCB5LCB0dXBsZShjKSlcbiAgICAgICAgICBwb2x5X3Nob3cgPSB0Y2FudmFzLnNob3dfaW1hZ2VcbiAgICAgICAgZWxpZiBzeXMucGxhdGZvcm0uc3RhcnRzd2l0aCgnVEktUHl0aG9uJyk6XG4gICAgICAgICAgaW1wb3J0IHRpX2dyYXBoaWNzXG4gICAgICAgICAgaW1wb3J0IHRpX3N5c3RlbVxuICAgICAgICAgIHNjcmVlbl95MCwgbmVlZF9saW5lLCBuZWVkX3JlY3QgPSAzMCwgMCwgMFxuICAgICAgICAgIGRlZiBwb2x5X2RyYXdfbGluZSh4MSwgeTEsIHgyLCB5MiwgYyk6XG4gICAgICAgICAgICB0aV9ncmFwaGljcy5zZXRDb2xvcihjKVxuICAgICAgICAgICAgdGlfZ3JhcGhpY3MuZHJhd0xpbmUoeDEsIHkxICsgc2NyZWVuX3kwLCB4MiwgeTIgKyBzY3JlZW5feTApXG4gICAgICAgICAgZGVmIHBvbHlfZmlsbF9yZWN0KHgsIHksIHcsIGgsIGMpOlxuICAgICAgICAgICAgdGlfZ3JhcGhpY3Muc2V0Q29sb3IoYylcbiAgICAgICAgICAgIHRpX2dyYXBoaWNzLmZpbGxSZWN0KHgsIHkgKyBzY3JlZW5feTAsIHcsIGgpXG4gICAgICAgICAgZGVmIHBvbHlfc2V0X3BpeGVsKHgsIHksIGMpOlxuICAgICAgICAgICAgdGlfZ3JhcGhpY3Muc2V0UGl4ZWwoeCwgeSArIHNjcmVlbl95MCwgYylcbiAgICAgICAgICBzY3JlZW5fdywgc2NyZWVuX2gsIHBvbHlfcGF1c2UsIG5lZWRfY2xlYW4sIG5lZWRfcGF1c2UgPSAzMjAsIDIxMCwgdGlfc3lzdGVtLmRpc3Bfd2FpdCwgMSwgMVxuICAgICAgZXhjZXB0OiAjIEdyYXBoIDM1K0UvVVNCIC8gNzUvODUvOTVcbiAgICAgICBwYXNzXG4gICAgZXhjZXB0OlxuICAgICAgcGFzc1xuICBpZiBub3Qgc2NyZWVuX3c6ICMgQ2FzaW8gR3JhcGggOTAvMzUrRSBJSVxuICAgIHRyeTpcbiAgICAgIGltcG9ydCBjYXNpb3Bsb3RcbiAgICAgIGNhc2lvcGxvdC5zZXRfcGl4ZWwoMCwgMCwgKDAsIDAsIDI1NSkpXG4gICAgICBjb2wgPSBjYXNpb3Bsb3QuZ2V0X3BpeGVsKDAsIDApXG4gICAgICB0ID0gY29sWzBdID09IGNvbFsyXVxuICAgICAgc2NyZWVuX3csIHNjcmVlbl9oLCBwb2x5X3NldF9waXhlbCwgcG9seV9zaG93ID0gdCBhbmQgMTI4IG9yIDM4NCwgdCBhbmQgNjQgb3IgMTkyLCBjYXNpb3Bsb3Quc2V0X3BpeGVsLCBjYXNpb3Bsb3Quc2hvd19zY3JlZW5cbiAgICBleGNlcHQ6XG4gICAgICBwYXNzXG4gIGlmIG5vdCBzY3JlZW5fdzpcbiAgICB0cnk6ICMgTnVtV29ya3NcbiAgICAgIGltcG9ydCBrYW5kaW5za3lcbiAgICAgIHNjcmVlbl93LCBzY3JlZW5faCwgcG9seV9zZXRfcGl4ZWwsIG5lZWRfcmVjdCA9IDMyMCwgMjIyLCBrYW5kaW5za3kuc2V0X3BpeGVsLCAwXG4gICAgICBkZWYgcG9seV9maWxsX3JlY3QoeCwgeSwgdywgaCwgYyk6XG4gICAgICAgIGthbmRpbnNreS5maWxsX3JlY3QoaW50KHgpLCBpbnQoeSksIGludCh3KSwgaW50KGgpLCBjKVxuICAgIGV4Y2VwdDpcbiAgICAgIHRyeTogIyBIUCBQcmltZVxuICAgICAgICBpbXBvcnQgaHBwcmltZVxuICAgICAgICBzY3JlZW5fdywgc2NyZWVuX2gsIGNvbG9yX2JpdHMsIG5lZWRfY2xlYW4sIG5lZWRfcGF1c2UgPSAzMjAsIDI0MCwgKDgsIDgsIDgpLCAxLCAxXG4gICAgICAgIGRlZiBwb2x5X3NldF9waXhlbCh4LCB5LCBjKTpcbiAgICAgICAgICBocHByaW1lLnBpeG9uKDAsIHgsIHksIGNvbDNfMl9yZ2IoYywgY29sb3JfYml0cywgMSkpXG4gICAgICAgIGRlZiBwb2x5X3BhdXNlKCk6XG4gICAgICAgICAgd2hpbGUgaHBwcmltZS5rZXlib2FyZCgpOlxuICAgICAgICAgICAgcGFzc1xuICAgICAgICAgIHdoaWxlIG5vdCBocHByaW1lLmtleWJvYXJkKCk6XG4gICAgICAgICAgICBwYXNzXG4gICAgICBleGNlcHQ6XG4gICAgICAgIHBhc3NcblxuICBpZiBzY3JlZW5fdzpcbiAgICBpZiBuZWVkX2xpbmU6XG4gICAgICBkZWYgcG9seV9kcmF3X2xpbmUoeDEsIHkxLCB4MiwgeTIsIGMpOlxuICAgICAgICBtLCBhMSwgYjEsIGEyLCBiMiA9IDAsIGludCh4MSksIGludCh5MSksIGludCh4MiksIGludCh5MilcbiAgICAgICAgaWYgKHgyIC0geDEpICoqIDIgPCAoeTIgLSB5MSkgKiogMjpcbiAgICAgICAgICBtLCBhMSwgYTIsIGIxLCBiMiA9IDEsIGIxLCBiMiwgYTEsIGEyXG4gICAgICAgIGlmIG1pbihhMSwgYTIpICE9IGExOiBhMSwgYjEsIGEyLCBiMiA9IGEyLCBiMiwgYTEsIGIxXG4gICAgICAgIGZvciBrIGluIHJhbmdlKGEyIC0gYTEgKyAxKTpcbiAgICAgICAgICBhLCBiID0gYTEgKyBrLCBpbnQoYjEgKyAoYjIgLSBiMSkgKiBrIC8gKChhMiAtIGExKSBvciAxKSlcbiAgICAgICAgICBwb2x5X3NldF9waXhlbCgoYSwgYilbbV0sIChiLCBhKVttXSArIHNjcmVlbl95MCwgYylcblxuICAgIGlmIG5lZWRfcmVjdDpcbiAgICAgIGRlZiBwb2x5X2ZpbGxfcmVjdCh4LCB5LCB3LCBoLCBjKTpcbiAgICAgICAgZm9yIGsgaW4gcmFuZ2UoaCk6XG4gICAgICAgICAgcG9seV9kcmF3X2xpbmUoeCwgeSArIGssIHggKyB3IC0gMSwgeSArIGssIGMpXG5cbiAgICBpZiBuZWVkX2NsZWFuOlxuICAgICAgZGVmIHBvbHlfY2xlYW5fc2NyZWVuKCk6XG4gICAgICAgIHBvbHlfZmlsbF9yZWN0KDAsIDAsIHNjcmVlbl93LCBzY3JlZW5faCwgWzI1NSwgMjU1LCAyNTVdKVxuXG4gICAgaWYgbmVlZF9wYXVzZTpcbiAgICAgIGRlZiBwb2x5X3Nob3dfcGF1c2UoKTpcbiAgICAgICAgcG9seV9zaG93KClcbiAgICAgICAgcG9seV9wYXVzZSgpXG4gICAgZWxzZTpcbiAgICAgIHBvbHlfc2hvd19wYXVzZSA9IHBvbHlfc2hvd1xuXG4gIHJldHVybiBzY3JlZW5fdywgc2NyZWVuX2gsIHBvbHlfc2V0X3BpeGVsLCBwb2x5X2RyYXdfbGluZSwgcG9seV9maWxsX3JlY3QsIHBvbHlfY2xlYW5fc2NyZWVuLCBwb2x5X3Nob3dfcGF1c2VcbiJ9LHsibmFtZSI6ImxhYnkucHkiLCJjb250ZW50IjoiI2Nhc1xuZnJvbSBtYXRoIGltcG9ydCBzaW4sIGNvcywgYXNpbiwgcGlcbmZyb20gcG9seWNhbGMgaW1wb3J0ICpcblxuZGVmIHJpKGEsYik6XG4gIGdsb2JhbCBzXG4gIHMgPSAocyAqIDIxNDAxMyArIDI1MzEwMTEpICUgNDI5NDk2NzI5NlxuICByID0gKHMgLy8gNjU1MzYpICYgMHg3ZmZmXG4gIHJldHVybiByICUgKGItYSkgKyBhXG5cbmRlZiBtb25fc2VjcmV0KHYsIGIsIG4pOlxuICByZXR1cm4gdiAmIH4oYiAqIDIqKm4pXG5cbmRlZiBtb25feG9yKGEsIGIpOlxuICByZXR1cm4gYSArIGIgLSAoYSAmIGIpXG5cbmRlZiB1Zmwocik6XG4gIGdsb2JhbCBybFxuICBpLCBzID0gciAvLyAzLCAxMCAqIChyICUgMylcbiAgcmVwID0gcmxbaV0vLzIqKnMgJiAxMDIzXG4gIGlmIHJlcCAhPSByOlxuICAgIHJlcCA9IHVmbChyZXApXG4gICAgcmxbaV0gPSBtb25fc2VjcmV0KHJsW2ldLCAxMDIzLCBzKVxuICAgIHMgPSByZXAgKiAyKipzXG4gICAgcmxbaV0gPSBtb25feG9yKHJsW2ldLCBzKVxuICByZXR1cm4gcmVwXG5cbmRlZiB1Zm0ocjEsIHIyKTpcbiAgZ2xvYmFsIHJsXG4gIGksIHIxID0gcjEgLy8gMywgMTAgKiAocjEgJSAzKVxuICByMiAqPSAyKipyMVxuICBybFtpXSA9IG1vbl9zZWNyZXQocmxbaV0sIDEwMjMsIHIxKVxuICBybFtpXSA9IG1vbl94b3IocmxbaV0sIHIyKVxuXG5kZWYgY291dCh4KTpcbiAgcmV0dXJuIGxlbihzdHIocm91bmQoYWJzKHgpLzEuLDUpKSlcblxuZGVmIGFfZ2F1Y2hlKGEpOlxuICBnbG9iYWwgc3RhdGVcbiAgc3RhdGVbNV0gKz0gNSArIGNvdXQoYSlcbiAgc3RhdGVbMl0gLT0gYVxuXG5kZWYgYV9kcm9pdGUoYSk6XG4gIGFfZ2F1Y2hlKC1hKVxuXG5kZWYgYXZhbmNlcihsKTpcbiAgZ2xvYmFsIHN0YXRlXG4gIHQgPSBzdGF0ZVsyXSoyKmFzaW4oMSkvcGlcbiAgZHgsIGR5ID0gY29zKHQpLCBzaW4odClcbiAgc3RhdGVbNV0gKz0gOCArIGNvdXQobClcbiAgd2hpbGUobCA+IDApOlxuICAgIHN0YXRlWzM6NV0gPSBzdGF0ZVswOjJdXG4gICAgeCwgeSA9IHN0YXRlWzBdICsgZHgvNCwgc3RhdGVbMV0gKyBkeS80XG4gICAgaXgsIGl5ID0gaW50KHgpIC0gKHggPCAwKSwgaW50KHkpIC0gKHkgPCAwKVxuICAgIGRyeCwgZHJ5ID0gaXggLSBpbnQoc3RhdGVbM10pLCBpeSAtIGludChzdGF0ZVs0XSlcbiAgICB2dyA9IGxhbWJkYSB5LCB4OiB3bFt5XSAmIDIqKnhcbiAgICBodyA9IGxhbWJkYSB5LCB4OiB3bFt5ICsgbGFieV9oXSAmIDIqKnhcbiAgICB3eCA9IGxhYnlfdyAtIDIgLSBtaW4oaXgsIGl4IC0gZHJ4KVxuICAgIHR4ID0gZHJ4IGFuZCAoaXggPCAwIG9yIGl4ID49IGxhYnlfdyBvciB2dyhpeSAtIGRyeSwgbGFieV93IC0gMiAtIG1pbihpeCwgaXggLSBkcngpKSlcbiAgICB0eSA9IGRyeSBhbmQgKGl5IDwgMCBvciBpeSA+PSBsYWJ5X2ggb3IgaHcobWluKGl5LCBpeSAtIGRyeSksIGxhYnlfdyAtIDEgLSAoaXggLSBkcngpKSlcbiAgICB0ID0gZHggPD0gMCBvciBpbnQoeCkgPCBsYWJ5X3cgLSAxIG9yIGludCh5KSA8IGxhYnlfaCAtIDFcbiAgICBpZiB0IGFuZCB0eCBvciB0eSBvciAoZHJ4IGFuZCBkcnkgYW5kICh0IGFuZCB0eCBvciB0eSkpIG9yIChkcnggYW5kIGRyeSBhbmQgKHQgYW5kIHZ3KGl5LCBsYWJ5X3cgLSAyIC0gbWluKGl4LCBpeCAtIGRyeCkpIG9yIGh3KG1pbihpeSwgaXkgLSBkcnkpLCBsYWJ5X3cgLSAxIC0gaXgpKSk6XG4gICAgICBzdGF0ZVs1XSArPSAxNVxuICAgICAgcmV0dXJuXG4gICAgbCAtPSAuMjVcbiAgICBzdGF0ZVs2XSArPSAoc3RhdGVbNl0gPCAyMDApXG4gICAgc3RhdGVbMDoyXSA9ICh4LCB5KVxuICAgIHBvbHlfZHJhd19saW5lKHN0YXRlWzNdICogengsIHN0YXRlWzRdICogenksIHN0YXRlWzBdICogengsIHN0YXRlWzFdICogenksIGNvbG9yc1s0XSlcblxubGFieV93LCBsYWJ5X2ggPSAyMCwgMTJcbnMgPSAweGRlYWRiZWVmXG5cbnJsID0gWygzKmkgKyAyKSoxMDQ4NTc2ICsgKDMqaSArIDEpKjEwMjQgKyAzKmkgZm9yIGkgaW4gcmFuZ2UobGFieV93KmxhYnlfaCArIDIvLzMpXVxud2wgPSBbKDIqKihsYWJ5X3cgKyAxKSAtIDEpIC8vICgxICsgKGsgPCBsYWJ5X2gpKSBmb3IgayBpbiByYW5nZSgyKmxhYnlfaCAtIDEpXVxuY2wgPSBsZW4ocmwpXG53aGlsZSBjbCA+IDEgLSAobGFieV93ICogbGFieV9oKS8vMTAwKjEwOlxuICB5ID0gcmkoMCwgMipsYWJ5X2ggLSAxKVxuICB4ID0gcmkoMCwgbGFieV93IC0gKHkgPCBsYWJ5X2gpKVxuICBpZiB3bFt5XSAmIDIqKng6XG4gICAgaWYgeSA8IGxhYnlfaDpcbiAgICAgIHIxID0geSpsYWJ5X3cgKyB4XG4gICAgICByMiA9IHIxICsgMVxuICAgIGVsc2U6XG4gICAgICByMSA9ICh5IC0gbGFieV9oKSpsYWJ5X3cgKyB4XG4gICAgICByMiA9IHIxICsgbGFieV93XG4gICAgcmwxLCBybDIgPSB1ZmwocjEpLCB1ZmwocjIpXG4gICAgaWYgcmwxICE9IHJsMiBvciBjbCA8PSAxOlxuICAgICAgdWZtKHJsMSwgcmwyKVxuICAgICAgY2wgLT0gMVxuICAgICAgd2xbeV0gPSBtb25fc2VjcmV0KHdsW3ldLCAxLCB4KVxuZm9yIHIgaW4gcmFuZ2UobGVuKHJsKSk6XG4gIHVmbChyKVxuXG5zY3JlZW5fdywgc2NyZWVuX2gsIHBvbHlfc2V0X3BpeGVsLCBwb2x5X2RyYXdfbGluZSwgcG9seV9maWxsX3JlY3QsIHBvbHlfY2xlYW5fc2NyZWVuLCBwb2x5X3Nob3dfc2NyZWVuID0gZ2V0X2luZm9zKClcbmRzID0gNFxuemludCA9IDEgKyAoc2NyZWVuX3cgPiAyKmxhYnlfdypkcylcbmRzICs9IHppbnQgLSAxXG56eCwgenkgPSAoc2NyZWVuX3cgLSB6aW50KSAvIGxhYnlfdywgKHNjcmVlbl9oIC0gemludCkgLyBsYWJ5X2hcbmdldF9pbmZvcywgcG9seV9zZXRfcGl4ZWwsIHJsLCB1ZmwsIHVmbSA9IE5vbmUsIE5vbmUsIE5vbmUsIE5vbmUsIE5vbmVcbmNvbG9ycyA9IChbMCwgOTUsIDBdLCBbMCwgMCwgNjNdLCBbMCwgMTI3LCAwXSwgWzAsIDAsIDc5XSwgWzI1NSwgMCwgMF0pXG5cbmRlZiBhbGxlcl9zZWxvbihmKTpcbiAgZ2xvYmFsIHN0YXRlXG4gIHN0YXRlID0gWzAsIC41LCAwLCAwLCAuNSwgMCwgMF1cbiAgcG9seV9jbGVhbl9zY3JlZW4oKVxuICBmb3IgaSBpbiByYW5nZSgyKTpcbiAgICBwb2x5X2ZpbGxfcmVjdCgwLCBpICogbGFieV9oICogenksIGxhYnlfdyAqIHp4LCB6aW50LCBjb2xvcnNbMV0pXG4gICAgcG9seV9maWxsX3JlY3QoaSAqIGxhYnlfdyAqIHp4LCAobm90IGkpICogenksIHppbnQsIChsYWJ5X2ggLSAxKSAqIHp5LCBjb2xvcnNbMF0pXG4gIGZvciB5IGluIHJhbmdlKDIqbGFieV9oIC0gMSk6XG4gICAgZm9yIHogaW4gcmFuZ2UobGFieV93IC0gKHkgPCBsYWJ5X2gpKTpcbiAgICAgIGlmIHdsW3ldICYgMioqejpcbiAgICAgICAgeCA9IGxhYnlfdyAtIDEgLSB6XG4gICAgICAgIGlmIHkgPCBsYWJ5X2g6XG4gICAgICAgICAgcG9seV9maWxsX3JlY3QoeCAqIHp4LCB5ICogenksIHppbnQsIHp5LCBjb2xvcnNbMl0pXG4gICAgICAgIGVsc2U6XG4gICAgICAgICAgcG9seV9maWxsX3JlY3QoeCAqIHp4LCAoeSAtIGxhYnlfaCArIDEpICogenksIHp4LCB6aW50LCBjb2xvcnNbM10pXG4gIGYoKVxuICBwb2x5X3Nob3dfc2NyZWVuKClcbiAgc3RhdGVbNV0gLT0gc3RhdGVbNl0gLy8gMlxuICBwcmludCgnQ29uc29tbWF0aW9uIDogJyArIHN0cihzdGF0ZVs1XSkpXG4gIGlmIHN0YXRlWzBdID49IGxhYnlfdzpcbiAgICBwcmludCgnQnJhdm8sIHR1IGVzIHNvcnRpLWUuJylcbiAgICBwcmludCgnUG91ciBqb3VlciBldCBnYWduZXIsJylcbiAgICBwcmludCgnZW52b2llIHRvbiBzY3JpcHQgYScpXG4gICAgcHJpbnQoJ2luZm9AdGlwbGFuZXQub3JnLicpXG4gIHJldHVybiBzdGF0ZVs1XVxuIn1dfQ==")));

    constructor() {
        this.onAuthStateChangedHandler = [];
        this.user = null;
        this.gists = null;
        
        window.localStorage.setItem('projects', TiPlanetConnector.__init_projects);
    }

    /**
     * @returns {TiPlanetConnector}
     */
    static getInstance() {
        if (TiPlanetConnector.__instance == null) {
            TiPlanetConnector.__instance = new TiPlanetConnector();
        }

        return this.__instance;
    }

    getUserName() {
        return "Dummy Name";
    }

    getUserPhotoURL() {
        return profile;
    }

    onAuthStateChanged(changed_func) {
        this.onAuthStateChangedHandler.push(changed_func);
    }

    removeAuthStateChanged(changed_func) {
        this.onAuthStateChangedHandler = this.onAuthStateChangedHandler.filter(element => element !== changed_func);
    }

    isLogged() {
        return true;
    }

    login(function_good, function_error) {
        function_good();
    }

    logout() {
        
    }

    getDefaultFileName(name) {
        var init_file_name = "";
        
        for(let i in name.toLowerCase()) {
            let char = name.toLowerCase()[i];
            if (TiPlanetConnector.__allowed_chars_file.includes(char)) {
                init_file_name += char;
            }
        }
        
        if (init_file_name.length === 0) {
            init_file_name = "main";
        }
        
        init_file_name += ".py";
        
        return init_file_name;
    }
    
    getDefaultFiles(name) {
        let files = {};
        
        files[this.getDefaultFileName(name)] = {
            "content": TiPlanetConnector.__init_file_content
        };
        
        return files;
    }

    getProjects(callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        let output = [];
        for (let name in projects) {
            output.push({
                "name": name,
                "files": [],
                "loaded": false,
                "loading": false,
                "selected": false
            });
        }
        
        console.log(output);

        callback(output);
    }

    loadProject(name, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }
        
        if (projects[name] === undefined) {
            callback(null);
            return;
        }
        
        callback({
            "name": name,
            "files": projects[name],
            "loaded": true,
            "loading": false,
            "selected": true
        });
    }

    createProject(name, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[name] !== undefined) {
            callback(null);
            return;
        }
        
        projects[name] = [{
            "name": this.getDefaultFileName(name),
            "content": TiPlanetConnector.__init_file_content
        }];

        callback({
            "name": name,
            "files": projects[name],
            "loading": false,
            "loaded": true,
            "selected": true
        });
        
        window.localStorage.setItem('projects', JSON.stringify(projects));
    }

    renameProject(oldname, newname, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[oldname] === undefined) {
            callback(null, null);
            return;
        }
        
        projects[newname] = projects[oldname];
        delete projects[oldname];
        window.localStorage.setItem('projects', JSON.stringify(projects));
        callback(oldname, newname);
    }

    removeProject(name, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[name] === undefined) {
            callback(null);
            return;
        }
        
        delete projects[name];
        window.localStorage.setItem('projects', JSON.stringify(projects));
        callback(name);
    }

    saveProject(project, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[project.name] === undefined) {
            callback(null);
            return;
        }
        
        projects[project.name] = project.files;
        window.localStorage.setItem('projects', JSON.stringify(projects));
        callback(project);
    }
}

