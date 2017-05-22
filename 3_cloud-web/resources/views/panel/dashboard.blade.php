@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">

        <div class="col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h1 class="text-uppercase text-center">Dashboard</h1>
                </div>

                <div class="panel-body">
                    <h3>Kanał: <span class="channel-name"></span></h3>
                    <p>Ostania aktualizacja kanału: <span class="channel-last-update"></span></p>
                    <p><span class="channel-description"></span></p>
                </div>
            </div>
        </div>

        <div id="sensors" class="col-xs-12">
            <div class="row">

            </div>
        </div>

    </div>
</div>
@endsection
