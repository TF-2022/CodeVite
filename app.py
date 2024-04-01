from flask import Flask, render_template
import os

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or os.urandom(24)
app.config['STATIC_FOLDER'] = '../static'


def read_files_css(repertoire):
    css_contenus = {}
    noms_fichiers = [
        '_config.css', '_scss_config.scss', 'accordions.css', 'alerts.css',
        'badges.css', 'buttons.css', 'cards.css', 'checkboxs.css', 'draggable.css',
        'dropdowns.css', 'generateCode.css', 'inputs.css', 'main.css', 'modal.css',
        'navs.css', 'notifications.css', 'off_canvas.css', 'radio-check-group.css',
        'selects.css', 'sidebar.css', 'tables.css', 'tabs.css', 'toggle_theme.css',
        'variables.css'
    ]
    for nom_fichier in noms_fichiers:
        chemin = os.path.join(repertoire, nom_fichier)
        if os.path.isfile(chemin):
            with open(chemin, 'r') as fichier:
                css_contenus[nom_fichier.replace('.css', '').replace('.scss', '').replace('-', '_')] = fichier.read()
    return css_contenus


@app.route('/')
def index():
    css_contenus = read_files_css('static/css')
    return render_template('index.html', css_contenus=css_contenus)

if __name__ == '__main__':
    app.run(
        host='localhost',
        port=5000,
        debug=True
    )
