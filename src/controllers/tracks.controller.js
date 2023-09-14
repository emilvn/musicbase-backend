function getAllTracks(req, res, _next){
    connection.query(
        "SELECT * FROM tracks",
        (err, results, _fields) => {
            if(err) throw err;
            res.json(results);
        }
    );
}

function getSpecificTrack(req, res, _next){
  const id = Number(req.params.id);

  connection.query(
    "SELECT * FROM tracks WHERE id = ?", [id],
    (err, result, _fields) => {
      if(err) throw err;
      res.json(result)
    }
  )
  
}

function addTrack(req, res, _next){
  const newTrack = req.body;

  connection.query(
    "INSERT INTO tracks (id, track_name) VALUES (?, ?);"
    [newTrack.id, newTrack.track_name],
    (err, resulst, _fields) => {
      if(err) throw err;
      res.json(resulst)
    }

  )
}


function updateTracks (req, res, _next){
  const id = Number(req.params.id);
  const updateTrack = req.body;

  connection.query(
    "UPDATE tracks SET track_name = ?, WHERE id = ?",
    [updateTrack.track_name, id],
    (err, result, _fields) => {
      if(err)throw err;
      res.json();
    }
  );
}

function deleteTrack(req, res, _next){
    const id = Number(req.params.id);
    connection.query(
        "DELETE FROM tracks WHERE id = ?",
        [id],
        (err, result, _fields) => {
            if(err) throw err;
            res.json(result);
        }
    );
}

