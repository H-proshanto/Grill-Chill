import View from './View';
import previewView from './previewView';

class ResultsView extends View {
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  setResultsView() {
    this._parentEl = document.querySelector('.results');
  }
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }

  refresh() {
    this._parentEl.innerHTML = '';
  }
}

export default new ResultsView();
