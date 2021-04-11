<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="@lang('general.dir')">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>
    @lang('general.apptitle')
  </title>

  <!-- Scripts -->
  <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js"></script>
  <script src="{{ asset('js/app.js') }}" defer></script>
  <script>
  window.Laravel = <?php echo json_encode([
    'csrfToken' => csrf_token(),
    'APP_JS'=> asset('js/'),
    'Assets' => asset('graphs/'),
    'APP_URL' => url('/')
  ]); ?>
  </script>

  <!-- Styles -->
  <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
  <link  href="{{asset('fonts/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
     integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
     crossorigin=""/>
     <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
  integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
  crossorigin=""></script>
</head>
<body style="text-align: {{ __('general.text-align') }};">
  <div id="app">




  <main class="py-4">



<div class="container" style="text-align: center;">

  <div class="row">

    <a id="how-to" data-toggle="modal" data-target="#myModal"> @lang('general.graphs')</a>

    @if(app()->getLocale() == 'en')
    <a class="nav-icon" title="Switch Language" href="{{ route('set_lang', ['locale' => 'ar' ] ) }}" id="nav-icon-ar') }}">عربي</a>
    @else
    <a class="nav-icon" title="Switch Language" href="{{ route('set_lang', ['locale' => 'en' ] ) }}" id="nav-icon-en') }}">EN</a>
    @endif
  </div>
  <div class="white-box">


    <!-- Trigger the modal with a button -->
    <!-- <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> -->

    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            @if(app()->getLocale() == 'en')
            <button type="button" class="close enclose" data-dismiss="modal">&times;</button>
            @else
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            @endif
            <h4 class="modal-title">@lang('general.idea-title')</h4>
          </div>
          <div class="modal-body">
            <p>@lang('general.idea-content')</p>
          </div>
        </div>

      </div>
    </div>


  </div>


  <div id="white-box" style="display: block;overflow: auto;">
    <div class="row" >
      <div class="col-md-3">
        <div class="action-box">
          <label class="label-custom"><b>@lang('general.addnewloc-label')</b></label>
          <label class="label-custom" for="lat">@lang('general.lat')</label>
          <input class="input-custom" type="text" id="lat" name="lat">
          <label class="label-custom" for="long">@lang('general.long')</label>
          <input class="input-custom" type="text" id="long" name="long">
          <button class="button-dp bcolor m-t-10" id="add-loc">
            <span>@lang('general.add')</span>
          </button>
        </div>
        <div class="action-box">
          <label class="label-custom"><b>@lang('general.generate-label')</b></label>
          <label class="label-custom" for="number">@lang('general.number')</label>
          <select id="number" name="number">
            <option selected="selected" value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="80">80</option>
            <option value="100">100</option>
          </select>
          <button class="button-dp bcolor m-t-10" id="generate-rand">
            <span>@lang('general.generate')</span>
          </button>
        </div>
        <div class="action-box">
          <label class="label-custom" for="generate-k">@lang('general.kparam')</label>
          <select id="generate-k" name="generate-k">
            <option selected="selected" value="basic">K = 2</option>
            <option value="strong">K = 4</option>
          </select>
          <label class="label-custom m-t-10" for="mech">@lang('general.mech')</label>
          <select id="mech" name="mech">
            <option selected="selected" value="lap">Laplacian</option>
            <option value="gau">Gaussian</option>
          </select>
          <button class="button-dp acolor m-t-10" id="go-hide">
            <span>@lang('general.hideloc')</span>
          </button>
        </div>
        <div class="action-box">
          <button class="button-dp bcolor" id="save">
            <span>@lang('general.save')</span>
          </button>
          <div id="download-area"></div>
          <!-- <label class="label-custom">@lang('general.reset-label')</label> -->
          <button class="button-dp ccolor m-t-10" id="go-reset">
            <span>@lang('general.reset')</span>
          </button>
        </div>
      </div>
      <div class="col-md-9">
        <div id="mapid"></div>
      </div>
    </div>
    <br/>
    <div class="row table-responsive loglist">
      <table id="log" class="table table-light table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Timestamp</th>
            <th scope="col">Privacy Method</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</div>

  </main>
</div>

<footer>
  <p>@lang('general.copyrights')</p>
</footer>

</body>

</html>
